import { Box } from "@mui/material";
import TwoPlayerLayout from "../components/TwoPlayerLayout";
import ThreePlayerLayout from "../components/ThreePlayerLayout";
import FourPlayerLayout from "../components/FourPlayerLayout";
import FivePlayerLayout from "../components/FivePlayerLayout";
import SixPlayerLayout from "../components/SixPlayerLayout";
import PropTypes from "prop-types";
import Header from "../components/Header";

const GameLayout = ({ gameState }) => {
  switch(gameState.players.length) {
    case 2:
      return (<TwoPlayerLayout gameState={gameState} />);
    case 3:
      return (<ThreePlayerLayout gameState={gameState} />);
    case 4:
      return (<FourPlayerLayout gameState={gameState} />);
    case 5:
      return (<FivePlayerLayout gameState={gameState} />);
    case 6:
      return (<SixPlayerLayout gameState={gameState} />);
    default:
      return (<></>);
  }
}

GameLayout.propTypes = {
  gameState: PropTypes.object.isRequired
}; 

function GamePage({ gameState }) {
  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        minHeight: '90vh',
        maxWidth: '90vw',
        justifyContent: 'space-evenly',
      }}
    >
      <Header title={gameState.title} subtitle={gameState.subtitle} />
      <GameLayout gameState={gameState} />
    </Box>
  );
}

GamePage.propTypes = {
  gameState: PropTypes.object.isRequired
};

export default GamePage;