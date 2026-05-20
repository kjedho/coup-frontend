import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Button,
    Stack,
    Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { determineCardIcon } from "./PlayerCard";

function LoseInfluenceDialog({ cards, sendMessage, onClose }) {
    return (
        <Dialog open={true} maxWidth="sm" fullWidth>
            <DialogTitle>Choose which influence to lose</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} justifyContent="center">
                    {cards.map((card, index) => (
                        <Grid item key={index}>
                            <Button
                                onClick={() => {
                                    sendMessage(
                                        "/lose_influence " + card.role
                                    );
                                    onClose();
                                }}
                                sx={{ textTransform: "none" }}
                            >
                                <Stack
                                    direction="column"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <img
                                        src={determineCardIcon(card)}
                                        height="150px"
                                    />
                                    <Typography variant="body1" color="white">
                                        {card.role}
                                    </Typography>
                                </Stack>
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

LoseInfluenceDialog.propTypes = {
    cards: PropTypes.array.isRequired,
    sendMessage: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default LoseInfluenceDialog;
