import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";
import PropTypes from "prop-types";

function ChallengeDialog({ prompt, sendMessage, onClose }) {
    const isBlockChallenge = prompt.type === "block_challenge_prompt";

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
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{description}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
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
