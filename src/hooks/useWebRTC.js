import { useRef, useState, useCallback, useEffect } from "react";

const ICE_CONFIG = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function useWebRTC(sendMessage, playerUuid) {
    const peersRef = useRef(new Map()); // uuid -> RTCPeerConnection
    const localStreamRef = useRef(null);
    const signalQueueRef = useRef([]);
    const readyRef = useRef(false);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStreams, setRemoteStreams] = useState(new Map());
    const [cameraEnabled, setCameraEnabled] = useState(false);

    const sendSignal = useCallback(
        (toUuid, signalData) => {
            sendMessage(
                JSON.stringify({
                    signal_type: "webrtc_signal",
                    to_uuid: toUuid,
                    signal_data: signalData,
                })
            );
        },
        [sendMessage]
    );

    const createPeer = useCallback(
        (peerUuid, initiator, stream) => {
            const existing = peersRef.current.get(peerUuid);
            if (existing) {
                return existing;
            }

            const pc = new RTCPeerConnection(ICE_CONFIG);

            // Add local tracks
            if (stream) {
                stream.getTracks().forEach((track) => {
                    pc.addTrack(track, stream);
                });
            }

            // Collect remote tracks into a stream
            const remoteStream = new MediaStream();
            pc.ontrack = (event) => {
                remoteStream.addTrack(event.track);
                setRemoteStreams((prev) => {
                    const next = new Map(prev);
                    next.set(peerUuid, remoteStream);
                    return next;
                });
            };

            // Send ICE candidates
            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    sendSignal(peerUuid, {
                        type: "candidate",
                        candidate: event.candidate,
                    });
                }
            };

            pc.onconnectionstatechange = () => {
                if (pc.connectionState === "failed" || pc.connectionState === "closed") {
                    peersRef.current.delete(peerUuid);
                    setRemoteStreams((prev) => {
                        const next = new Map(prev);
                        next.delete(peerUuid);
                        return next;
                    });
                }
            };

            peersRef.current.set(peerUuid, pc);

            // If initiator, create and send offer
            if (initiator) {
                pc.createOffer()
                    .then((offer) => pc.setLocalDescription(offer))
                    .then(() => {
                        sendSignal(peerUuid, {
                            type: "offer",
                            sdp: pc.localDescription,
                        });
                    })
                    .catch((err) => console.warn("[WebRTC] offer error:", err));
            }

            return pc;
        },
        [sendSignal]
    );

    const processSignal = useCallback(
        async (fromUuid, signalData) => {
            let pc = peersRef.current.get(fromUuid);

            if (signalData.type === "offer") {
                if (!pc) {
                    pc = createPeer(fromUuid, false, localStreamRef.current);
                }
                await pc.setRemoteDescription(new RTCSessionDescription(signalData.sdp));
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                sendSignal(fromUuid, {
                    type: "answer",
                    sdp: pc.localDescription,
                });
            } else if (signalData.type === "answer") {
                if (pc) {
                    await pc.setRemoteDescription(new RTCSessionDescription(signalData.sdp));
                }
            } else if (signalData.type === "candidate") {
                if (pc) {
                    try {
                        await pc.addIceCandidate(new RTCIceCandidate(signalData.candidate));
                    } catch (_) {
                        // ignore late ICE candidates
                    }
                }
            }
        },
        [createPeer, sendSignal]
    );

    const startConnections = useCallback(
        async (peerUuids) => {
            try {
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                const constraints = {
                    video: isMobile
                        ? { width: 320, height: 240 }
                        : { width: 640, height: 480 },
                    audio: { echoCancellation: true },
                };
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                localStreamRef.current = stream;
                setLocalStream(stream);
                setCameraEnabled(true);

                for (const peerUuid of peerUuids) {
                    const initiator = playerUuid < peerUuid;
                    createPeer(peerUuid, initiator, stream);
                }
            } catch (err) {
                console.warn("Camera access denied or unavailable:", err);
                setCameraEnabled(false);
                for (const peerUuid of peerUuids) {
                    const initiator = playerUuid < peerUuid;
                    createPeer(peerUuid, initiator, null);
                }
            }

            // Mark ready and flush queued signals
            readyRef.current = true;
            const queued = signalQueueRef.current;
            signalQueueRef.current = [];
            for (const { fromUuid, signalData } of queued) {
                processSignal(fromUuid, signalData);
            }
        },
        [playerUuid, createPeer, processSignal]
    );

    const handleSignal = useCallback(
        (fromUuid, payload) => {
            const signalData = payload.signal_data;
            if (!signalData) return;

            if (!readyRef.current) {
                signalQueueRef.current.push({ fromUuid, signalData });
                return;
            }

            processSignal(fromUuid, signalData);
        },
        [processSignal]
    );

    const toggleCamera = useCallback(() => {
        const stream = localStreamRef.current;
        if (!stream) return;

        const videoTracks = stream.getVideoTracks();
        videoTracks.forEach((track) => {
            track.enabled = !track.enabled;
        });
        setCameraEnabled(videoTracks.length > 0 && videoTracks[0].enabled);
    }, []);

    const cleanup = useCallback(() => {
        peersRef.current.forEach((pc) => {
            try {
                pc.close();
            } catch (_) {
                // ignore
            }
        });
        peersRef.current.clear();

        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach((t) => t.stop());
            localStreamRef.current = null;
        }

        readyRef.current = false;
        signalQueueRef.current = [];
        setLocalStream(null);
        setRemoteStreams(new Map());
        setCameraEnabled(false);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => cleanup();
    }, [cleanup]);

    return {
        localStream,
        remoteStreams,
        cameraEnabled,
        toggleCamera,
        startConnections,
        handleSignal,
        cleanup,
    };
}
