
import { Container, Stack, Button, Typography, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import PropTypes from 'prop-types';
import { useState } from 'react';

function Lobby({ playerState }) {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const [showAlert, setAlert] = useState(false);

    return (
        <Container sx={{ border: '4px '+primary+' solid', borderRadius: '10px', width: '475px', padding: '30px' }} >
            <Stack  spacing={3}>
                <Typography variant="h4" textAlign="center">
                    Players in the lobby
                </Typography>
                {playerState.players.map((player, index) => (
                    <Stack key={index} direction="row" justifyContent="center" spacing={5}>
                        <Typography variant="h5" textAlign="center" width="200px">
                            {player.name}
                        </Typography>
                        <Button variant="contained" color={player.ready ? "success" : "error"} sx={{ width: "100px" }} >
                            {player.ready ? "Joined" : "Waiting"}
                        </Button>
                    </Stack>
                ))}
                <CopyToClipboard text={ playerState.lobby } >
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
    playerState: PropTypes.object.isRequired
};

export default Lobby;