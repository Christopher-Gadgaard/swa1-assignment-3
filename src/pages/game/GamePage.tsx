//GamePage.tsx

import Topbar from "../../components/topbar/topbar";
import "./styles.css";

import GameComponent from "../../components/game/GameComponent";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { startNewGame } from "../../thunks/gameServerThunks";

const Game: React.FC = () => {

   // State to manage whether the game has started
   const [gameStarted, setGameStarted] = useState(false);
   const { token, userId } = useSelector((state: RootState) => state.user);
   const dispatch = useDispatch<AppDispatch>();
   
    const handleStartGame = () => {
      if (token && userId !== null) {
        dispatch(startNewGame(token, userId));
        setGameStarted(true);
      } else {
        alert("You must be logged in to start a game!");
      }
    };

   return (
    <div>
      <Topbar />
      <div className="gameContainer">
        {!gameStarted ? (
          // Display start button if game hasn't started
          <button onClick={handleStartGame} className="startGameButton">Start Game</button>
        ) : (
          // Display game component if game has started
          <GameComponent onGameStart={handleStartGame} />
        )}
      </div>
    </div>
  );
};

export default Game;
