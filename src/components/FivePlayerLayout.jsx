import { Grid } from "@mui/material";
import PlayerCard from "./PlayerCard";
import PropTypes from "prop-types";

function FivePlayerLayout({ gameState }) {
    return(
        <Grid container justifyContent="space-evenly" rowSpacing={4}>
            <Grid item sm={4}>
                <PlayerCard playerState={gameState.players[0]} />
            </Grid>
            <Grid item sm={4}>
                <PlayerCard playerState={gameState.players[1]} />
            </Grid>
            <Grid item sm={4}>
                <PlayerCard playerState={gameState.players[2]} />
            </Grid>
            <Grid item sm={4}>
                <PlayerCard playerState={gameState.players[3]} />
            </Grid>
            <Grid item sm={4}>
                <PlayerCard playerState={gameState.players[4]} />
            </Grid>
        </Grid>
    );
}

FivePlayerLayout.propTypes = {
    gameState: PropTypes.object.isRequired
};

export default FivePlayerLayout;