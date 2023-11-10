//GamePage.tsx

import Topbar from "../../components/topbar/topbar";
import "./styles.css";

import GameComponent from "../../components/game/GameComponent";

const Game: React.FC = () => {
  return (
    <div>
      <Topbar />
      <div className="gameContainer">
        <GameComponent />
      </div>
    </div>
  );
};

export default Game;
