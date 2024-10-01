
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Stack, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

function validName(name) {
    const re = /^[0-9A-Za-z]{4,16}$/;
    return re.test(name);
}

function validUuidV4(uuid) {
    const re =/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    return re.test(uuid);
}

function createAndJoinLobby(name, numberOfPlayers, sendMessage, navigate) {
    sendMessage("/create_lobby " + numberOfPlayers + " " + name);
    navigate("/lobby");
}

function joinLobby(name, uuid, sendMessage, navigate) {
    sendMessage("/join_lobby " + uuid + " " + name);
    navigate("/lobby");
}

function Creation({ sendMessage }) {
    const [name, setName] = useState("");
    const [numberOfPlayers, setNumberOfPlayers] = useState(2);
    const [uuid, setUuid] = useState("");
    const columnWidth = "15vw";
    const createButtonEnabled = 1 < numberOfPlayers && numberOfPlayers < 7 && validName(name);
    const joinButtonEnabled = validName(name) && validUuidV4(uuid);
    const navigate = useNavigate();

    return (
        <Stack direction="row" alignItems="center" justifyContent="space-evenly">
            <img
                src="https://dragonsdengames.com/wp-content/uploads/2020/10/Coup.jpg"
                alt="Coup"
                height="400vh"
            />
            <Stack direction="column" alignItems="center" justifyContent="space-evenly" height="45vh" >
                <TextField
                    label="Enter your name"
                    variant="outlined"
                    sx={{
                        width: columnWidth,
                        marginBottom: "4vh" 
                    }}
                    error={!validName(name)}
                    helperText={validName(name) ? "" : "Name must be 4-16 characters long and contain only letters and numbers."}
                    onChange={(event) => setName(event.target.value)}
                />
                <Box>
                    <Stack direction="row" alignItems="center" >
                        <FormControl variant="filled">
                            <InputLabel id="number-of-players-label">Pick number of players</InputLabel>
                            <Select
                                labelId="number-of-players-label"
                                id="number-of-players"
                                label="Players"
                                defaultValue={2}
                                onChange={(event) => setNumberOfPlayers(event.target.value)}
                                sx={{
                                    width: columnWidth
                                }}
                            >
                                <MenuItem value={2}>Two</MenuItem>
                                <MenuItem value={3}>Three</MenuItem>
                                <MenuItem value={4}>Four</MenuItem>
                                <MenuItem value={5}>Five</MenuItem>
                                <MenuItem value={6}>Six</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Button 
                        variant="contained"
                        disabled={!createButtonEnabled}
                        sx={{ width: columnWidth, marginTop: "1vh" }}
                        onClick={() => createAndJoinLobby(name, numberOfPlayers, sendMessage, navigate)}
                    >
                        Create private lobby
                    </Button>
                </Box>
                <Typography variant="h6" textAlign="center" color="primary">
                    OR
                </Typography>
                <Stack direction="column" alignItems="center" >
                    <TextField 
                        label="Enter your lobby UUID v4"
                        variant="filled"
                        sx={{
                            width:columnWidth,
                        }}
                        error={!validUuidV4(uuid)}
                        helperText={validUuidV4(uuid) ? "" : "Invalid UUID v4 format."}
                        onChange={(event) => setUuid(event.target.value)}
                    />
                    <Button
                        variant="contained"
                        disabled={!joinButtonEnabled}
                        sx={{ width: columnWidth, marginTop: "1vh" }}
                        onClick={() => joinLobby(name, uuid, sendMessage, navigate)}
                    >
                        Join private lobby
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}

Creation.propTypes = {
    sendMessage: PropTypes.func.isRequired
};

export default Creation;