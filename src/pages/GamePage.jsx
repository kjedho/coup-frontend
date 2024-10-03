import { Box } from "@mui/material";
import PropTypes from "prop-types";
import Header from "../components/Header";
import PlayerLayout from "../components/PlayerLayout";
import Footer from "../components/Footer";

function GamePage({ playerUuid, gameState, sendMessage }) {
  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        minHeight: '90vh',
        justifyContent: 'space-evenly',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Header title={gameState.title} subtitle={gameState.subtitle} />
      <PlayerLayout playerUuid={playerUuid} gameState={gameState} sendMessage={sendMessage}/>
      <Footer />
    </Box>
  );
}

GamePage.propTypes = {
  playerUuid: PropTypes.string.isRequired,
  gameState: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired
};

export default GamePage;