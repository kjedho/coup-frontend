
import { useState } from 'react';
import { createGame } from '../api/createGame';
import { joinGame } from '../api/joinGame';
import { Box, Stack, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

function ValidName(name) {
    const re = /^[0-9A-Za-z]{6,16}$/;
    return re.test(name);
}

function ValidUuidV4(uuid) {
    const re =/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    return re.test(uuid);
}

function Creation() {
    const [name, setName] = useState("");
    const [numberOfPlayers, setNumberOfPlayers] = useState(2);
    const [uuid, setUuid] = useState("");
    const columnWidth = "15vw";
    const createButtonEnabled = 1 < numberOfPlayers && numberOfPlayers < 7 && ValidName(name);
    const joinButtonEnabled = ValidName(name) && ValidUuidV4(uuid);


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
                    error={!ValidName(name)}
                    helperText={ValidName(name) ? "" : "Name must be 6-16 characters long and contain only letters and numbers."}
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
                        onClick={() => createGame(name, numberOfPlayers)}
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
                        error={!ValidUuidV4(uuid)}
                        helperText={ValidUuidV4(uuid) ? "" : "Invalid UUID v4 format."}
                        onChange={(event) => setUuid(event.target.value)}
                    />
                    <Button
                        variant="contained"
                        disabled={!joinButtonEnabled}
                        sx={{ width: columnWidth, marginTop: "1vh" }}
                        onClick={() => joinGame(name, uuid)}
                    >
                        Join private lobby
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Creation;