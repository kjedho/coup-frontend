
import { Container, Stack, Button, Typography, Alert, useMediaQuery, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import PropTypes from 'prop-types';
import { useState } from 'react';

function playerList({ lobbyState }) {
    var playerList = [];
    for (var i = 0; i < lobbyState.players.length; i++) {
        playerList.push({name: lobbyState.players[i], ready: true});
    }
    for (var j = playerList.length; j < lobbyState.max_players; j++) {
        playerList.push({name: "Player "+(j+1), ready: false});
    }
    return playerList;
}

function startGame(sessionUUID, sendMessage) {
    sendMessage("/start_game " + sessionUUID);
}

function Lobby({ lobbyState, sendMessage, isCreator }) {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [showAlert, setAlert] = useState(false);
    const players = playerList({lobbyState});

    return (
        <Box sx={{ 
            border: '4px '+primary+' solid', 
            borderRadius: '10px', 
            width: isMobile ? '95vw' : '475px',
            maxWidth: '475px',
            mx: 'auto',
            p: { xs: 2, sm: 3 }
        }}>
            <Stack spacing={2}>
                <Typography variant={isMobile ? "h5" : "h4"} textAlign="center">
                    Players in the lobby
                </Typography>
                {players.map((player, index) => (
                    <Stack 
                        key={index} 
                        direction="row" 
                        justifyContent="space-between" 
                        alignItems="center"
                        spacing={2}
                        sx={{ px: 1 }}
                    >
                        <Typography 
                            variant={isMobile ? "body1" : "h6"} 
                            sx={{ 
                                flex: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {player.name}
                        </Typography>
                        <Button 
                            variant="contained" 
                            color={player.ready ? "success" : "error"} 
                            size={isMobile ? "small" : "medium"}
                            sx={{ minWidth: isMobile ? "70px" : "100px", flexShrink: 0 }} 
                        >
                            {player.ready ? "Joined" : "Waiting"}
                        </Button>
                    </Stack>
                ))}
                <CopyToClipboard text={ lobbyState.room_code } >
                    <Button variant="outlined" color="primary" size="medium" onClick={() => {setAlert(true)}}>
                        Copy lobby code
                    </Button>
                </CopyToClipboard>
                {isCreator && (
                    <Button variant="contained" color="primary" size="medium" onClick={() => {startGame(lobbyState.room_code, sendMessage)}}>
                        Start game
                    </Button>
                )}
            </Stack>
            {showAlert && <Alert variant="outlined" severity="success" onClose={() => {setAlert(false)}} sx={{ mt: 2 }}>Copied!</Alert>}
        </Box>
    );
}

Lobby.propTypes = {
    lobbyState: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    isCreator: PropTypes.bool,
};

export default Lobby;