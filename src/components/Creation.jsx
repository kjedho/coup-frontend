
import { useState } from 'react';
import { Box, Stack, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

function Creation() {
    const [numberOfPlayers, setNumberOfPlayers] = useState(2);
    const columnWidth = "15vw";

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
                />
                <Box>
                    <Stack direction="row" alignItems="center" >
                        <FormControl variant="filled">
                            <InputLabel id="number-of-players-label">Pick number of players</InputLabel>
                            <Select
                                labelId="number-of-players-label"
                                id="number-of-players"
                                label="Players"
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
                    <Button variant="contained" sx={{ width: columnWidth, marginTop: "1vh" }}>
                        Create private lobby
                    </Button>
                </Box>
                <Typography variant="h6" textAlign="center" color="primary">
                    OR
                </Typography>
                <Stack direction="column" alignItems="center" >
                    <TextField 
                        label="Enter your lobby link"
                        variant="filled"
                        sx={{
                            width:columnWidth,
                        }}
                    />
                    <Button variant="contained" sx={{ width: columnWidth, marginTop: "1vh" }}>
                        Join private lobby
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Creation;