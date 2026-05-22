import { Route, Routes, useNavigate } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useState, useEffect } from "react";
import { Snackbar, Alert, CircularProgress, Box } from "@mui/material";

import LandingPage from "./pages/LandingPage";
import GamePage from "./pages/GamePage";
import LobbyPage from "./pages/LobbyPage";
import { WEBSOCKET_URL } from "./api/constants";

function App() {
  const { sendMessage, lastMessage, readyState } = useWebSocket(WEBSOCKET_URL, {
    shouldReconnect: () => true,
    reconnectInterval: 3000,
  });
  const navigate = useNavigate();

  const [playerUuid, setPlayerUuid] = useState(null);
  const [lobbyState, setLobbyState] = useState({ room_code: "", max_players: 2, players: [] });
  const [gameState, setGameState] = useState({ title: "", subtitle: "", players: [], coins: 0, current_player: "", available_actions: [] });
  const [error, setError] = useState(null);
  const [loseInfluenceCards, setLoseInfluenceCards] = useState(null);
  const [gameOverWinner, setGameOverWinner] = useState(null);
  const [challengePrompt, setChallengePrompt] = useState(null);
  const [blockPrompt, setBlockPrompt] = useState(null);
  const [actionResult, setActionResult] = useState(null);

  useEffect(() => {
    if (!lastMessage) return;
    try {
      const msg = JSON.parse(lastMessage.data);
      console.log("Received:", msg);

      switch (msg.type) {
        case "connected":
          setPlayerUuid(msg.player_uuid);
          break;
        case "lobby_state":
          setLobbyState(msg);
          setGameState({ title: "", subtitle: "", players: [], coins: 0, current_player: "", available_actions: [] });
          setGameOverWinner(null);
          setLoseInfluenceCards(null);
          setChallengePrompt(null);
          setBlockPrompt(null);
          if (window.location.pathname !== "/lobby") {
            navigate("/lobby");
          }
          break;
        case "game_state":
          setGameState(msg);
          setLoseInfluenceCards(null);
          setChallengePrompt(null);
          setBlockPrompt(null);
          if (window.location.pathname === "/lobby") {
            navigate("/game");
          }
          break;
        case "error":
          setError(msg.message);
          break;
        case "game_over":
          setGameOverWinner(msg.winner);
          setChallengePrompt(null);
          setBlockPrompt(null);
          break;
        case "lose_influence_choice":
          setLoseInfluenceCards(msg.cards);
          setChallengePrompt(null);
          setBlockPrompt(null);
          break;
        case "challenge_prompt":
        case "block_challenge_prompt":
          setChallengePrompt(msg);
          setBlockPrompt(null);
          break;
        case "block_prompt":
          setBlockPrompt(msg);
          setChallengePrompt(null);
          break;
        case "action_result":
          setActionResult(msg.message);
          break;
        default:
          console.log("Unknown message type:", msg.type);
      }
    } catch (e) {
      console.log("Non-JSON message:", lastMessage.data);
    }
  }, [lastMessage, navigate]);

  if (readyState !== ReadyState.OPEN) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage sendMessage={sendMessage} />} />
        <Route path="/lobby" element={<LobbyPage lobbyState={lobbyState} sendMessage={sendMessage} playerUuid={playerUuid} />} />
        <Route path="/game" element={
          <GamePage
            gameState={gameState}
            sendMessage={sendMessage}
            loseInfluenceCards={loseInfluenceCards}
            setLoseInfluenceCards={setLoseInfluenceCards}
            gameOverWinner={gameOverWinner}
            setGameOverWinner={setGameOverWinner}
            challengePrompt={challengePrompt}
            setChallengePrompt={setChallengePrompt}
            blockPrompt={blockPrompt}
            setBlockPrompt={setBlockPrompt}
          />
        } />
      </Routes>
      <Snackbar
        open={error !== null}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setError(null)} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={actionResult !== null}
        autoHideDuration={5000}
        onClose={() => setActionResult(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setActionResult(null)} severity="info" variant="filled">
          {actionResult}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
