import { Stack } from "@mui/material";
import PlayerCard from "./PlayerCard";
import PropTypes from "prop-types";

function ThreePlayerLayout({ gameState }) {
    return(
        <Stack direction="row" justifyContent="space-evenly">
            <PlayerCard playerState={gameState.players[0]} />
            <PlayerCard playerState={gameState.players[1]} />
            <PlayerCard playerState={gameState.players[2]} />
        </Stack>
    );
}

ThreePlayerLayout.propTypes = {
    gameState: PropTypes.object.isRequired
};

export default ThreePlayerLayout;