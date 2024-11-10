import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Checkbox,
  Typography
} from '@mui/material';
import { ImageListItem, ImageListItemBar } from '@mui/material';
import PropTypes from "prop-types";


function AmbassadorDialog({ cards, sendMessage, determineCardIcon }) {
    const [selectedCards, setSelectedCards] = useState([]);
    const [openDialog, setOpenDialog] = useState(true); 

    const dialogCards = cards.map((card, index) => {
        return {
            id: index,
            image: determineCardIcon(card),
            title: card.role
        };
    });

    const handleToggle = (id) => {
        setSelectedCards((prevSelected) =>
            prevSelected.includes(id)
            ? prevSelected.filter((imageId) => imageId !== id)
            : [...prevSelected, id]
        );
    };

    const handleConfirm = () => {
        const temp = selectedCards.map(index => cards[index])
        console.log(temp);
        setOpenDialog(false);
        sendMessage("/action exchange_confirm " + temp.map((card) => {return card.role}).join(" "));
    }

    return (
    <Dialog open={openDialog} maxWidth="md" fullWidth>
        <DialogTitle>{"Select " + (cards.length-2).toString() + " card(s) to keep"}</DialogTitle>
        <DialogContent>
        <Grid container spacing={2}>
            {dialogCards.map((card) => (
            <Grid item md={3} key={card.id}>
                <ImageListItem>
                <img src={card.image} alt={card.title} style={{ width: '100%' }} />
                <ImageListItemBar
                    title={<Typography variant="body2">{card.title}</Typography>}
                    actionIcon={
                    <Checkbox
                        checked={selectedCards.includes(card.id)}
                        onChange={() => handleToggle(card.id)}
                        color="primary"
                    />
                    }
                    position="bottom"
                />
                </ImageListItem>
            </Grid>
            ))}
        </Grid>
        </DialogContent>
        <DialogActions>
        <Button variant="contained" onClick={() => handleConfirm()} disabled={selectedCards.length != cards.length-2}>Confirm</Button>
        </DialogActions>
    </Dialog>
    );
}

AmbassadorDialog.propTypes = {
    cards: PropTypes.array.isRequired,
    sendMessage: PropTypes.func.isRequired,
    determineCardIcon: PropTypes.func.isRequired
};

export default AmbassadorDialog;