import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GamePage from "./pages/GamePage";
import LobbyPage from "./pages/LobbyPage";

function App() {
  // TODO: remove the following lines
  const gameState = {
    title: "Player 1's turn",
    subtitle: "Choose an action",
    players: [
      {
        name: "Player 1",
        cards: [
          {role: "Duke", visible: true},
          {role: "Contessa", visible: true}
        ],
        coins: 2,
        loading: 0,
      },
      {
        name: "Player 2",
        cards: [
          {role: "Assassin", visible: true},
          {role: "Captain", visible: false}
        ],
        coins: 6,
        loading: 30,
      },
      {
        name: "Player 3",
        cards: [
          {role: "Ambassador", visible: true},
          {role: "Duke", visible: false}
        ],
        coins: 4,
        loading: 60,
      },
      {
        name: "Player 4",
        cards: [
          {role: "Captain", visible: true},
          {role: "Assassin", visible: true}
        ],
        coins: 0,
        loading: 90,
      },
      {
        name: "Player 5",
        cards: [
          {role: "Contessa", visible: true},
          {role: "Ambassador", visible: false}
        ],
        coins: 6,
        loading: 100,
      },
      {
        name: "Player 6",
        cards: [
          {role: "Captain", visible: true},
          {role: "Captain", visible: false}
        ],
        coins: 4,
        loading: 40,
      },
    ]
  };

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/lobby" element={<LobbyPage />} />
      <Route path="/game" element={<GamePage gameState={gameState} />} />
    </Routes>
    </>
  );
}

export default App;