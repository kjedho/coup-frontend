import { Route, Routes } from "react-router-dom";
import CreationPage from "./pages/CreationPage";
import GamePage from "./pages/GamePage";

function App() {
  // TODO: remove the following line
  const gameState = {
    players: [
      {
        name: "Player 1",
        cards: [
          {role: "Duke", visible: true},
          {role: "Contessa", visible: true}
        ],
        coins: 2,
        action: "Income"
      },
      {
        name: "Player 2",
        cards: [
          {role: "Assassin", visible: true},
          {role: "Captain", visible: false}
        ],
        coins: 6,
        action: "Steal"
      }
    ]
  };

  return (
    <>
    <Routes>
      <Route path="/" element={<CreationPage />} />
      <Route path="/game" element={<GamePage gameState={gameState} />} />
    </Routes>
    </>
  );
}

export default App;