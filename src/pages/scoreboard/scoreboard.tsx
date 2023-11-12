import Topbar from "../../components/topbar/topbar";
import { getColumns } from "../../components/scoreDataGrid/columns";
import ScoreDataGrid from "../../components/scoreDataGrid/scoreGrid";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { Card } from "@mui/material";
import "./style.css";
import gemQuestLogo from "../../images/GemQuest.png";
const ScorebardPage: React.FC = () => {
  const currentUserId = useSelector((state: RootState) => state.user.userId);
  return (
    <div className="scoreboardPage">
      <Topbar />
      <img
        src={gemQuestLogo}
        style={{
          marginTop: "100px",
          width: "200px",
          height: "200px",
        }}
      />
      <Card
        className="scoreboard-container"
        sx={{
          width: "100%",
          alignSelf: "center",
        }}
      >
        <h1>Scoreboard</h1>
        <div className="scoreboard">
          <ScoreDataGrid columns={getColumns(currentUserId)} games={[]} />
        </div>
      </Card>
    </div>
  );
};
export default ScorebardPage;
