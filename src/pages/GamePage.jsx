import { Box } from "@mui/material";
import PropTypes from "prop-types";
import Header from "../components/Header";
import PlayerLayout from "../components/PlayerLayout";
import Footer from "../components/Footer";
import LoseInfluenceDialog from "../components/LoseInfluenceDialog";
import GameOverDialog from "../components/GameOverDialog";
import ChallengeDialog from "../components/ChallengeDialog";
import BlockDialog from "../components/BlockDialog";

function GamePage({
    gameState,
    sendMessage,
    loseInfluenceCards,
    setLoseInfluenceCards,
    gameOverWinner,
    setGameOverWinner,
    challengePrompt,
    setChallengePrompt,
    blockPrompt,
    setBlockPrompt,
}) {
    return (
        <Box
            sx={{
                flexDirection: "column",
                display: "flex",
                minHeight: "90vh",
                justifyContent: "space-evenly",
                marginLeft: "auto",
                marginRight: "auto",
            }}
        >
            <Header
                title={gameState.title}
                subtitle={gameState.subtitle}
            />
            <PlayerLayout gameState={gameState} sendMessage={sendMessage} />
            <Footer />
            {loseInfluenceCards && (
                <LoseInfluenceDialog
                    cards={loseInfluenceCards}
                    sendMessage={sendMessage}
                    onClose={() => setLoseInfluenceCards(null)}
                />
            )}
            {challengePrompt && (
                <ChallengeDialog
                    prompt={challengePrompt}
                    sendMessage={sendMessage}
                    onClose={() => setChallengePrompt(null)}
                />
            )}
            {blockPrompt && (
                <BlockDialog
                    prompt={blockPrompt}
                    sendMessage={sendMessage}
                    onClose={() => setBlockPrompt(null)}
                />
            )}
            {gameOverWinner && (
                <GameOverDialog
                    winner={gameOverWinner}
                    onClose={() => setGameOverWinner(null)}
                />
            )}
        </Box>
    );
}

GamePage.propTypes = {
    gameState: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    loseInfluenceCards: PropTypes.array,
    setLoseInfluenceCards: PropTypes.func.isRequired,
    gameOverWinner: PropTypes.string,
    setGameOverWinner: PropTypes.func.isRequired,
    challengePrompt: PropTypes.object,
    setChallengePrompt: PropTypes.func.isRequired,
    blockPrompt: PropTypes.object,
    setBlockPrompt: PropTypes.func.isRequired,
};

export default GamePage;
