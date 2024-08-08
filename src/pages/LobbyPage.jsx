import { Box, Container } from '@mui/material';
import Lobby from "../components/Lobby";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PropTypes from 'prop-types';

function LobbyPage({ playerState }) {
  return (
    <Container>
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        minHeight: '90vh',
        maxWidth: '80vw',
        justifyContent: 'space-between',
        padding: '5vh',
      }}
    >
        <Header title="Welcome to the private Coup lobby" subtitle="Please wait until all players have joined."/>
        <Lobby playerState={playerState} />
        <Footer />
    </Box>
    </Container>
  );
}

LobbyPage.propTypes = {
  playerState: PropTypes.object.isRequired
};

export default LobbyPage;