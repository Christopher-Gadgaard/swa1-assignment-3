//GamePage.tsx

import Topbar from "../../components/topbar/topbar";
import "./styles.css";

import GameComponent from "../../components/game/GameComponent";
import { useState } from "react";

const Game: React.FC = () => {

   // State to manage whether the game has started
   const [gameStarted, setGameStarted] = useState(false);
   
   const startGame = () => {
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
