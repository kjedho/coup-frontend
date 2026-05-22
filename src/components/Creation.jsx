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

function validUuidV4(uuid) {
    const re =
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    return re.test(uuid);
}

function createAndJoinLobby(name, numberOfPlayers, sendMessage) {
    sendMessage("/create_lobby " + numberOfPlayers + " " + name);
}

function joinLobby(name, uuid, sendMessage) {
    sendMessage("/join_lobby " + uuid + " " + name);
}

function Creation({ sendMessage }) {
    const [name, setName] = useState("");
    const [numberOfPlayers, setNumberOfPlayers] = useState(4);
    const [uuid, setUuid] = useState("");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const columnWidth = isMobile ? "80vw" : "280px";
    const createButtonEnabled =
        1 < numberOfPlayers && numberOfPlayers < 7 && validName(name);
    const joinButtonEnabled = validName(name) && validUuidV4(uuid);
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
                    label="Enter lobby code"
                    variant="filled"
                    sx={{ width: columnWidth, maxWidth: "90vw" }}
                    error={uuid.length > 0 && !validUuidV4(uuid)}
                    helperText={
                        uuid.length > 0 && !validUuidV4(uuid)
                            ? "Invalid UUID format."
                            : ""
                    }
                    onChange={(event) => setUuid(event.target.value)}
                />
                <Button
                    variant="contained"
                    disabled={!joinButtonEnabled}
                    sx={{ width: columnWidth, maxWidth: "90vw" }}
                    onClick={() =>
                        joinLobby(name, uuid, sendMessage)
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
