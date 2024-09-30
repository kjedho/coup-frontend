import { Box } from "@mui/material";
import PropTypes from "prop-types";
import Header from "../components/Header";
import PlayerLayout from "../components/PlayerLayout";
import Footer from "../components/Footer";

function GamePage({ gameState, sendMessage }) {
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
      <PlayerLayout gameState={gameState} />
      <Footer />
    </Box>
  );
}

GamePage.propTypes = {
  gameState: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired
};

export default GamePage;