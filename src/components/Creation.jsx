import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const [numberOfPlayers, setNumberOfPlayers] = useState(4);
    const [uuid, setUuid] = useState("");
    const columnWidth = "15vw";
    const createButtonEnabled =
        1 < numberOfPlayers && numberOfPlayers < 7 && validName(name);
    const joinButtonEnabled = validName(name) && validUuidV4(uuid);
    const navigate = useNavigate();

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={6}
        >
            <img
                src={coupImage}
                alt="Coup"
                style={{ height: "400px", borderRadius: "10px" }}
            />
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="space-evenly"
                height="50vh"
                spacing={2}
            >
            <TextField
                label="Enter your name"
                variant="outlined"
                sx={{ width: columnWidth }}
                error={name.length > 0 && !validName(name)}
                helperText={
                    name.length > 0 && !validName(name)
                        ? "Name must be 4-16 characters long and contain only letters and numbers."
                        : ""
                }
                onChange={(event) => setName(event.target.value)}
            />
            <Stack direction="row" alignItems="center" spacing={2}>
                <FormControl variant="filled" sx={{ width: columnWidth }}>
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
                sx={{ width: columnWidth }}
                onClick={() =>
                    createAndJoinLobby(
                        name,
                        numberOfPlayers,
                        sendMessage,
                        navigate
                    )
                }
            >
                Create private lobby
            </Button>
            <Typography variant="h6" textAlign="center" color="primary">
                OR
            </Typography>
            <Stack direction="column" alignItems="center" spacing={1}>
                <TextField
                    label="Enter your lobby UUID v4"
                    variant="filled"
                    sx={{ width: columnWidth }}
                    error={uuid.length > 0 && !validUuidV4(uuid)}
                    helperText={
                        uuid.length > 0 && !validUuidV4(uuid)
                            ? "Invalid UUID v4 format."
                            : ""
                    }
                    onChange={(event) => setUuid(event.target.value)}
                />
                <Button
                    variant="contained"
                    disabled={!joinButtonEnabled}
                    sx={{ width: columnWidth }}
                    onClick={() =>
                        joinLobby(name, uuid, sendMessage, navigate)
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
