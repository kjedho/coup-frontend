import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';

import Lobby from "../components/Lobby";
import Footer from "../components/Footer";
import Header from "../components/Header";

function LobbyPage({ lobbyState, sendMessage, playerUuid }) {
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
        <Lobby lobbyState={lobbyState} sendMessage={sendMessage} isCreator={playerUuid === lobbyState.creator_uuid} />
        <Footer />
    </Box>
    </Container>
  );
}

LobbyPage.propTypes = {
  lobbyState: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  playerUuid: PropTypes.string,
};

export default LobbyPage;