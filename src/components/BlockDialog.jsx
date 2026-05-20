import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack,
    LinearProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function BlockDialog({ prompt, sendMessage, onClose }) {
    const deadlineMs = (prompt.deadline_secs || 10) * 1000;
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const start = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const remaining = Math.max(0, 100 - (elapsed / deadlineMs) * 100);
            setProgress(remaining);
            if (remaining <= 0) clearInterval(interval);
        }, 100);
        return () => clearInterval(interval);
    }, [deadlineMs]);

    const description = prompt.target
        ? `${prompt.actor} wants to ${prompt.action} ${prompt.target}.`
        : `${prompt.actor} wants to ${prompt.action}.`;

    return (
        <Dialog open={true} maxWidth="xs" fullWidth>
            <LinearProgress variant="determinate" value={progress} />
            <DialogTitle>Block the action?</DialogTitle>
            <DialogContent>
                <Typography>{description}</Typography>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={1} sx={{ width: "100%", justifyContent: "flex-end" }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                            sendMessage("/allow");
                            onClose();
                        }}
                    >
                        Allow
                    </Button>
                    {prompt.blockable_by.map((role) => (
                        <Button
                            key={role}
                            variant="contained"
                            color="error"
                            onClick={() => {
                                sendMessage("/block " + role);
                                onClose();
                            }}
                        >
                            Block as {role}
                        </Button>
                    ))}
                </Stack>
            </DialogActions>
        </Dialog>
    );
}

BlockDialog.propTypes = {
    prompt: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default BlockDialog;
