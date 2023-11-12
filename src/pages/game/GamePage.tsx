//GamePage.tsx

import Topbar from "../../components/topbar/topbar";
import "./styles.css";

import GameComponent from "../../components/game/GameComponent";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { startNewGame } from "../../thunks/gameServerThunks";
import { Button } from "@mui/material";
import gemQuestLogo from "../../images/GemQuest.png";
const Game: React.FC = () => {
  // State to manage whether the game has started
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const { token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleStartGame = () => {
    if (token) {
      dispatch(startNewGame(token));
      setGameStarted(true);
    } else {
      alert("You must be logged in to start a game!");
    }
  };
  const handleEndGame = () => {
    if (token) {
      setGameEnded(true);
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
          marginTop: "100px",
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
                alert("end game");
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
