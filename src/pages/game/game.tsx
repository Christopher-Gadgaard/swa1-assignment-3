import GameGrid from "../../components/grid";
import Scoreboard from "../../components/scoreboard/scoreboard";
import Topbar from "../../components/topbar/topbar";
import "./styles.css";
const Game: React.FC = () => {
  return (
    <div>
      <Topbar />
      <Scoreboard score={1000} />
      <div className="gameContainer">
        <GameGrid size={8} />
      </div>
    </div>
  );
};
export default Game;
