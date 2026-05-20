import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function GameOverDialog({ winner, onClose }) {
    const navigate = useNavigate();

    return (
        <Dialog open={true}>
            <DialogTitle>Game Over</DialogTitle>
            <DialogContent>
                <Typography variant="h5" textAlign="center" sx={{ py: 2 }}>
                    {winner} wins!
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() => {
                        navigate("/");
                        onClose();
                    }}
                >
                    Back to Home
                </Button>
            </DialogActions>
        </Dialog>
    );
}

GameOverDialog.propTypes = {
    winner: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default GameOverDialog;
