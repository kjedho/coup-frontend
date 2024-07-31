import { Route, Routes } from "react-router-dom";
import CreationPage from "./pages/CreationPage";
import GamePage from "./pages/GamePage";

function App() {
  // TODO: remove the following line
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
          {role: "Duke", visible: true},
          {role: "Contessa", visible: true}
        ],
        coins: 0,
        loading: 90,
      },
      {
        name: "Player 5",
        cards: [
          {role: "Assassin", visible: true},
          {role: "Captain", visible: false}
        ],
        coins: 6,
        loading: 100,
      },
      {
        name: "Player 6",
        cards: [
          {role: "Ambassador", visible: true},
          {role: "Duke", visible: false}
        ],
        coins: 4,
        loading: 40,
      },
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