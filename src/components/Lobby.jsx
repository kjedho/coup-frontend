
import { Container, Stack, Button, Typography, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import PropTypes from 'prop-types';
import { useState } from 'react';

function playerList({ lobbyState }) {
    var playerList = [];
    for (var i = 0; i < lobbyState.players.length; i++) {
        playerList.push({name: lobbyState.players[i], ready: true});
    }
    for (var j = playerList.length; j < lobbyState.numPlayers; j++) {
        playerList.push({name: "Player "+(j+1), ready: false});
    }
    return playerList;
}

function Lobby({ lobbyState, sendMessage }) {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const [showAlert, setAlert] = useState(false);
    const players = playerList({lobbyState});

    return (
        <Container sx={{ border: '4px '+primary+' solid', borderRadius: '10px', width: '475px', padding: '30px' }} >
            <Stack  spacing={3}>
                <Typography variant="h4" textAlign="center">
                    Players in the lobby
                </Typography>
                {players.map((player, index) => (
                    <Stack key={index} direction="row" justifyContent="center" spacing={5}>
                        <Typography variant="h5" textAlign="center" width="200px">
                            {player.name}
                        </Typography>
                        <Button variant="contained" color={player.ready ? "success" : "error"} sx={{ width: "100px" }} >
                            {player.ready ? "Joined" : "Waiting"}
                        </Button>
                    </Stack>
                ))}
                <CopyToClipboard text={ lobbyState.sessionUUID } >
                    <Button variant="outlined" color="primary" size="medium" onClick={() => {setAlert(true)}}>
                        Copy lobby code
                    </Button>
                </CopyToClipboard>
                <Button variant="contained" color="primary" size="medium">
                    Start game
                </Button>
            </Stack>
            {showAlert && <Alert variant="outlined" severity="success" onClose={() => {setAlert(false)}} sx={{ margin: "16px" }}>Lobby code copied to clipboard!</Alert>}
        </Container>
    );
}

Lobby.propTypes = {
    lobbyState: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired
};

export default Lobby;