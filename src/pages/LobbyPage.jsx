import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';

import Lobby from "../components/Lobby";
import Footer from "../components/Footer";
import Header from "../components/Header";

function LobbyPage({ lobbyState, sendMessage, playerUuid }) {
  return (
    <Container maxWidth="lg">
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        minHeight: '90vh',
        justifyContent: 'space-between',
        py: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 2 },
      }}
    >
        <Header title="Private Coup Lobby" subtitle="Waiting for players to join..."/>
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