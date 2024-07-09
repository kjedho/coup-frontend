
import { useState } from 'react';
import { Stack, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function Creation() {
    const [numberOfPlayers, setNumberOfPlayers] = useState(2);

    return (
        <Stack direction="row" alignItems="center" justifyContent="space-evenly">
            <img
                src="https://dragonsdengames.com/wp-content/uploads/2020/10/Coup.jpg"
                alt="Coup"
                height="400vh"
            />
            <Stack direction="column" alignItems="center" >
                <Stack direction="row" alignItems="center" >
                    <TextField 
                        label="Enter your name"
                        variant="filled"
                        sx={{
                            width: "11.5vw",
                            marginRight: "0.25vw",
                        }}
                    />
                    <FormControl variant="filled">
                        <InputLabel id="number-of-players-label">Players</InputLabel>
                        <Select
                            labelId="number-of-players-label"
                            id="number-of-players"
                            label="Players"
                            onChange={(event) => setNumberOfPlayers(event.target.value)}
                            sx={{
                                width: "8vw",
                                marginLeft: "0.25vw",
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
                <Button variant="contained" sx={{ width: "20vw", marginTop: "0.5vw" }}>
                    Create private lobby
                </Button>
            </Stack>
        </Stack>
    );
}

export default Creation;