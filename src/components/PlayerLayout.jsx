import { Grid } from "@mui/material";
import PlayerCard from "./PlayerCard";
import PropTypes from "prop-types";

function PlayerLayout({ gameState }) {
    const playerCards = gameState.players.map((player, index) => 
        <Grid item sm={4} key={index}>
            <PlayerCard playerState={player} />
        </Grid>
    );
    return(
        <Grid container justifyContent="space-evenly" rowSpacing={4}>
            {playerCards}
        </Grid>
    );
}

PlayerLayout.propTypes = {
    gameState: PropTypes.object.isRequired
};

export default PlayerLayout;