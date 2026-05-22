import { useRef, useState, useCallback, useEffect } from "react";
import SimplePeer from "simple-peer";

const ICE_SERVERS = [{ urls: "stun:stun.l.google.com:19302" }];

export default function useWebRTC(sendMessage, playerUuid) {
    const peersRef = useRef(new Map());
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
            // Don't create a duplicate peer
            const existing = peersRef.current.get(peerUuid);
            if (existing && !existing.destroyed) {
                return existing;
            }

            const peer = new SimplePeer({
                initiator,
                stream: stream || undefined,
                trickle: true,
                config: { iceServers: ICE_SERVERS },
            });

            peer.on("signal", (data) => {
                sendSignal(peerUuid, data);
            });

            peer.on("stream", (remoteStream) => {
                setRemoteStreams((prev) => {
                    const next = new Map(prev);
                    next.set(peerUuid, remoteStream);
                    return next;
                });
            });

            peer.on("close", () => {
                peersRef.current.delete(peerUuid);
                setRemoteStreams((prev) => {
                    const next = new Map(prev);
                    next.delete(peerUuid);
                    return next;
                });
            });

            peer.on("error", (err) => {
                console.warn("WebRTC peer error with", peerUuid, err);
                peersRef.current.delete(peerUuid);
                setRemoteStreams((prev) => {
                    const next = new Map(prev);
                    next.delete(peerUuid);
                    return next;
                });
            });

            peersRef.current.set(peerUuid, peer);
            return peer;
        },
        [sendSignal]
    );

    const processSignal = useCallback(
        (fromUuid, signalData) => {
            let peer = peersRef.current.get(fromUuid);
            if (!peer || peer.destroyed) {
                // Received a signal from a peer we haven't created yet (they initiated)
                peer = createPeer(fromUuid, false, localStreamRef.current);
            }

            try {
                peer.signal(signalData);
            } catch (err) {
                console.warn("Error signaling peer", fromUuid, err);
            }
        },
        [createPeer]
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
                // Buffer signals until startConnections has completed
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
        peersRef.current.forEach((peer) => {
            try {
                peer.destroy();
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
