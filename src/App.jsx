import { Route, Routes } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useState } from "react";
import { useEffect } from "react";

import LandingPage from "./pages/LandingPage";
import GamePage from "./pages/GamePage";
import LobbyPage from "./pages/LobbyPage";
import { WEBSOCKET_URL } from "./api/constants";

function App() {
  const {sendMessage, lastMessage, readyState} = useWebSocket(WEBSOCKET_URL);

  const [lobbyState, setLobbyState] = useState({sessionUUID: "", numPlayers: 2, players: ["Player 1"]});
  const [gameState, setGameState] = useState({title: "", subtitle: "", players: []});

  useEffect(() => {
    if (readyState === ReadyState.CONNECTING) {
      console.log("Connection state CONNECTING.")
    } else if (readyState === ReadyState.OPEN) {
      console.log("Connection state OPEN.")
    } else if (readyState === ReadyState.CLOSING) {
      console.log("Connection state CLOSING.")
    } else if (readyState === ReadyState.CLOSED) {
      console.log("Connection state CLOSED.")
    }
  }, [readyState])

  useEffect(() => {
    if (!lastMessage) {
      return;
    }
    try {
      const message = JSON.parse(lastMessage.data);      
      console.log(`Parsed message: ${JSON.stringify(message)}`);
      if ("lobbyState" in message) {
        setLobbyState(message.lobbyState);
      } else if ("gameState" in message) {
        setGameState(message.gameState);
      }
    } catch (error) {
      console.log(lastMessage.data);  
    }
  }, [lastMessage])

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage sendMessage={sendMessage}/>} />
      <Route path="/lobby" element={<LobbyPage lobbyState={lobbyState} sendMessage={sendMessage}/>} />
      <Route path="/game" element={<GamePage gameState={gameState} sendMessage={sendMessage}/>} />
    </Routes>
    </>
  );
}

export default App;