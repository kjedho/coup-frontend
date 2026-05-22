import { Grid } from "@mui/material";
import PlayerCard from "./PlayerCard";
import PropTypes from "prop-types";

function PlayerLayout({ gameState, sendMessage }) {
    const playerCards = gameState.players.map((player, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
            <PlayerCard
                gameState={gameState}
                playerState={player}
                sendMessage={sendMessage}
            />
        </Grid>
    ));
    return (
        <Grid 
            container 
            justifyContent="space-evenly" 
            rowSpacing={{ xs: 2, sm: 4 }}
            columnSpacing={{ xs: 1, sm: 2 }}
            sx={{ px: { xs: 1, sm: 2 } }}
        >
            {playerCards}
        </Grid>
    );
}

PlayerLayout.propTypes = {
    gameState: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default PlayerLayout;
