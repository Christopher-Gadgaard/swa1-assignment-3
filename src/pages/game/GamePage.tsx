//GamePage.tsx

import Topbar from "../../components/topbar/topbar";
import "./styles.css";

import GameComponent from "../../components/game/GameComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { startNewGame, updateGame } from "../../thunks/gameServerThunks";
import { Button } from "@mui/material";
import gemQuestLogo from "../../images/GemQuest.png";
import { resetGame, resetScore } from "../../slices/gameSlice";
const Game: React.FC = () => {
  // State to manage whether the game has started
  const [gameStarted, setGameStarted] = useState(false);
  const { token, userId } = useSelector((state: RootState) => state.user);
  const { id } = useSelector((state: RootState) => state.gameLogic);
  const dispatch = useDispatch<AppDispatch>();

  const handleStartGame = () => {
    if (token && userId !== null) {
      setGameStarted(true);
    } else {
      alert("You must be logged in to start a game!");
    }
  };

  useEffect(() => {
    if (gameStarted && token && userId !== null && id === -1) {
      dispatch(startNewGame(token, userId));
      dispatch(resetScore());
    }
  }, [gameStarted, token, userId, id, dispatch]);

  const handleEndGame = () => {
    if (token && id !== -1) {
      dispatch(updateGame(id, token, { completed: true }));
      dispatch(resetGame()); // Reset the game state
      setGameStarted(false);
    } else {
      alert("You must be logged in to end a game!");
    }
  };



  return (
    <div className="gamePage">
      <Topbar />
      <img
        src={gemQuestLogo}
        style={{
          marginTop: "30px",
          width: "200px",
          height: "200px",
        }}
      />
      <div className="gameContainer">
        {!gameStarted ? (
          // Display start button if game hasn't started
          <button onClick={handleStartGame} className="startGameButton">
            Start Game
          </button>
        ) : (
          // Display game component if game has started
          <>
            <GameComponent onGameStart={handleStartGame} />
            <Button
              variant="contained"
              onClick={() => {
                handleEndGame();
              }}
            >
              End game
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Game;
