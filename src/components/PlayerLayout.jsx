import { Grid } from "@mui/material";
import PlayerCard from "./PlayerCard";
import PropTypes from "prop-types";

function PlayerLayout({ gameState, sendMessage }) {
    const playerCards = gameState.players.map((player, index) => (
        <Grid item sm={4} key={index}>
            <PlayerCard
                gameState={gameState}
                playerState={player}
                sendMessage={sendMessage}
            />
        </Grid>
    ));
    return (
        <Grid container justifyContent="space-evenly" rowSpacing={4}>
            {playerCards}
        </Grid>
    );
}

PlayerLayout.propTypes = {
    gameState: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default PlayerLayout;
