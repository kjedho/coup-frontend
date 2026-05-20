import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    LinearProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function ChallengeDialog({ prompt, sendMessage, onClose }) {
    const isBlockChallenge = prompt.type === "block_challenge_prompt";
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

    const title = isBlockChallenge
        ? "Challenge the block?"
        : "Challenge the action?";

    const description = isBlockChallenge
        ? `${prompt.blocker} claims ${prompt.claimed_role} to block ${prompt.original_action}.`
        : prompt.target
          ? `${prompt.actor} claims ${prompt.claimed_role} to ${prompt.action} ${prompt.target}.`
          : `${prompt.actor} claims ${prompt.claimed_role} to ${prompt.action}.`;

    return (
        <Dialog open={true} maxWidth="xs" fullWidth>
            <LinearProgress variant="determinate" value={progress} />
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{description}</Typography>
            </DialogContent>
            <DialogActions>
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
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                        sendMessage("/challenge");
                        onClose();
                    }}
                >
                    Challenge
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ChallengeDialog.propTypes = {
    prompt: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ChallengeDialog;
