//GamePage.tsx

import Topbar from "../../components/topbar/topbar";
import "./styles.css";

import GameComponent from "../../components/game/GameComponent";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Game: React.FC = () => {

   // State to manage whether the game has started
   const [gameStarted, setGameStarted] = useState(false);
   const dispatch = useDispatch();
   const startGame = () => {
    dispatch(startGame(token));
    setGameStarted(true);
  };

   return (
    <div>
      <Topbar />
      <div className="gameContainer">
        {!gameStarted ? (
          // Display start button if game hasn't started
          <button onClick={startGame} className="startGameButton">Start Game</button>
        ) : (
          // Display game component if game has started
          <GameComponent />
        )}
      </div>
    </div>
  );
};

export default Game;
