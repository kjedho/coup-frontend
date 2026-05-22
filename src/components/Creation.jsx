import { useState } from "react";
import PropTypes from "prop-types";
import {
    Stack,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    useMediaQuery,
    useTheme,
    Box,
} from "@mui/material";
import coupImage from "../assets/coup.png";

function validName(name) {
    const re = /^[0-9A-Za-z]{4,16}$/;
    return re.test(name);
}

function validRoomCode(code) {
    const re = /^[A-Za-z0-9]{4}$/;
    return re.test(code);
}

function createAndJoinLobby(name, numberOfPlayers, sendMessage) {
    sendMessage("/create_lobby " + numberOfPlayers + " " + name);
}

function joinLobby(name, roomCode, sendMessage) {
    sendMessage("/join_lobby " + roomCode.toUpperCase() + " " + name);
}

function Creation({ sendMessage }) {
    const [name, setName] = useState("");
    const [numberOfPlayers, setNumberOfPlayers] = useState(4);
    const [roomCode, setRoomCode] = useState("");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const columnWidth = isMobile ? "80vw" : "280px";
    const createButtonEnabled =
        1 < numberOfPlayers && numberOfPlayers < 7 && validName(name);
    const joinButtonEnabled = validName(name) && validRoomCode(roomCode);
    return (
        <Stack
            direction={isMobile ? "column" : "row"}
            alignItems="center"
            justifyContent="center"
            spacing={isMobile ? 3 : 6}
            sx={{ px: 2 }}
        >
            <Box
                component="img"
                src={coupImage}
                alt="Coup"
                sx={{ 
                    maxHeight: isMobile ? "200px" : "400px",
                    maxWidth: "90vw",
                    borderRadius: "10px",
                    objectFit: "contain"
                }}
            />
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="space-evenly"
                sx={{ minHeight: isMobile ? "auto" : "50vh" }}
                spacing={2}
            >
            <TextField
                label="Enter your name"
                variant="outlined"
                sx={{ width: columnWidth, maxWidth: "90vw" }}
                error={name.length > 0 && !validName(name)}
                helperText={
                    name.length > 0 && !validName(name)
                        ? "Name must be 4-16 alphanumeric characters."
                        : ""
                }
                onChange={(event) => setName(event.target.value)}
            />
            <Stack direction="row" alignItems="center" spacing={2}>
                <FormControl variant="filled" sx={{ width: columnWidth, maxWidth: "90vw" }}>
                    <InputLabel id="number-of-players-label">
                        Number of players
                    </InputLabel>
                    <Select
                        labelId="number-of-players-label"
                        id="number-of-players"
                        label="Players"
                        value={numberOfPlayers}
                        onChange={(event) =>
                            setNumberOfPlayers(event.target.value)
                        }
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
                sx={{ width: columnWidth, maxWidth: "90vw" }}
                onClick={() =>
                    createAndJoinLobby(
                        name,
                        numberOfPlayers,
                        sendMessage
                    )
                }
            >
                Create private lobby
            </Button>
            <Typography variant="h6" textAlign="center" color="primary">
                OR
            </Typography>
            <Stack direction="column" alignItems="center" spacing={1} sx={{ width: "100%" }}>
                <TextField
                    label="Enter room code"
                    variant="filled"
                    sx={{ width: columnWidth }}
                    inputProps={{ maxLength: 4, style: { textTransform: "uppercase", letterSpacing: "0.3em", textAlign: "center" } }}
                    error={roomCode.length > 0 && !validRoomCode(roomCode)}
                    helperText={
                        roomCode.length > 0 && !validRoomCode(roomCode)
                            ? "Code must be 4 characters."
                            : ""
                    }
                    onChange={(event) => setRoomCode(event.target.value)}
                />
                <Button
                    variant="contained"
                    disabled={!joinButtonEnabled}
                    sx={{ width: columnWidth, maxWidth: "90vw" }}
                    onClick={() =>
                        joinLobby(name, roomCode, sendMessage)
                    }
                >
                    Join private lobby
                </Button>
            </Stack>
        </Stack>
        </Stack>
    );
}

Creation.propTypes = {
    sendMessage: PropTypes.func.isRequired,
};

export default Creation;
