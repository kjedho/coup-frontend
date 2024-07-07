import React from "react";
import { Typography, Container, Stack, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Coup.css';

const theme = createTheme({
    palette: {
      primary: {
        main: "#0073e6",
      },
      secondary: {
        main: "#3399ff",
      },
    },
  });

class Coup extends React.Component {

    initialize = () => {
        return { players: 0 };
    };

    state = this.initialize();

    reset = () => {
        this.setState(this.initialize());
    };

    handleChange = (event: SelectChangeEvent) => {
        this.setState({
            players: event.target.value
        });
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{marginTop: "10vh"}}>
                <Typography variant="h2" textAlign="center">
                    Welcome to Coup online!
                </Typography>
                <Typography variant="h4" textAlign="center" color="primary">
                    <em>The place to be to play Coup privately with friends.</em>
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-evenly" marginTop="10vh">
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
                                    '& .MuiInputBase-input': {
                                        backgroundColor: "#ffffff",
                                    }
                                }}
                            />
                            <FormControl variant="filled">
                                <InputLabel id="number-of-players-label">Players</InputLabel>
                                <Select
                                    labelId="number-of-players-label"
                                    id="number-of-players"
                                    label="Players"
                                    onChange={this.handleChange}
                                    sx={{
                                        width: "8vw",
                                        marginLeft: "0.25vw",
                                        '& .MuiInputBase-input': {
                                            backgroundColor: "#ffffff",
                                        },
                                        backgroundColor: "#ffffff"                                        
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
                        <Button variant="contained" backgroundColor="secondary" sx={{ width: "20vw", marginTop: "0.5vw" }}>
                            Create private lobby
                        </Button>
                    </Stack>
                </Stack>
            </Container>
            </ThemeProvider>
        );
    }
}

export default Coup;