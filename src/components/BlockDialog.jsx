import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack,
} from "@mui/material";
import PropTypes from "prop-types";

function BlockDialog({ prompt, sendMessage, onClose }) {
    const description = prompt.target
        ? `${prompt.actor} wants to ${prompt.action} ${prompt.target}.`
        : `${prompt.actor} wants to ${prompt.action}.`;

    return (
        <Dialog open={true} maxWidth="xs" fullWidth>
            <DialogTitle>Block the action?</DialogTitle>
            <DialogContent>
                <Typography>{description}</Typography>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={1} sx={{ width: "100%", justifyContent: "flex-end" }}>
                    <Button
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
                            color="warning"
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
