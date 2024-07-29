import { Container, Stack } from "@mui/material";
import PlayerCard from "./PlayerCard";
import PropTypes from "prop-types";

function TwoPlayerLayout({ gameState }) {
    return(
        <Container>
        <Stack direction="row" justifyContent="space-evenly">
            <PlayerCard playerState={gameState.players[0]} />
            <PlayerCard playerState={gameState.players[1]} />
        </Stack>
        </Container>
    );
}

TwoPlayerLayout.propTypes = {
    gameState: PropTypes.object.isRequired
};

export default TwoPlayerLayout;