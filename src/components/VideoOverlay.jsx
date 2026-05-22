import { useRef, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import PropTypes from "prop-types";

function VideoOverlay({ stream, isSelf, cameraEnabled, toggleCamera, isMobile }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    if (!stream) return null;

    const width = isMobile ? "80px" : "216px";
    const height = isMobile ? "60px" : "162px";

    return (
        <Box sx={{ position: "relative", display: "inline-block" }}>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={isSelf}
                style={{
                    width,
                    height,
                    objectFit: "cover",
                    borderRadius: "8px",
                    transform: isSelf ? "scaleX(-1)" : "none",
                    background: "#000",
                }}
            />
            {isSelf && toggleCamera && (
                <IconButton
                    size="small"
                    onClick={toggleCamera}
                    sx={{
                        position: "absolute",
                        bottom: 2,
                        right: 2,
                        bgcolor: "rgba(0,0,0,0.5)",
                        color: "#fff",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                        padding: "2px",
                    }}
                >
                    {cameraEnabled ? (
                        <VideocamIcon fontSize="small" />
                    ) : (
                        <VideocamOffIcon fontSize="small" />
                    )}
                </IconButton>
            )}
        </Box>
    );
}

VideoOverlay.propTypes = {
    stream: PropTypes.object,
    isSelf: PropTypes.bool,
    cameraEnabled: PropTypes.bool,
    toggleCamera: PropTypes.func,
    isMobile: PropTypes.bool,
};

export default VideoOverlay;
