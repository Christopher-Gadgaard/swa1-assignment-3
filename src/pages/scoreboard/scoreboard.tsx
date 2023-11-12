import Topbar from "../../components/topbar/topbar";
import { DataGrid } from "@mui/x-data-grid";
import { getColumns } from "../../components/scoreDataGrid/columns";
import ScoreDataGrid from "../../components/scoreDataGrid/scoreGrid";

const ScorebardPage: React.FC = () => {
  return (
    <div>
      <Topbar />
      <ScoreDataGrid columns={getColumns()} games={[]} />
    </div>
  );
};
export default ScorebardPage;
