import React from "react";
import { Typography, Container, Stack, TextField, Button } from '@mui/material';
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
        return {};
    };

    state = this.initialize();

    reset = () => {
        this.setState(this.initialize());
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
                        <TextField 
                            label="Enter your name"
                            variant="filled"
                            sx={{
                                width: "15vw",
                                marginBottom: "1vh",
                                '& .MuiInputBase-input': {
                                    backgroundColor: "#ffffff",
                                }
                            }}
                        />
                        <Button variant="contained" backgroundColor="secondary" sx={{ width: "15vw", marginTop: "1vh" }}>
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