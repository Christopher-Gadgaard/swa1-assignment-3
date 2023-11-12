import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export interface Props {
  columns: GridColDef[];
  games: any[];
}
const ScoreDataGrid: React.FC<Props> = ({ columns }) => {
  const [rowData, setRowData] = useState<Array<Game>>();
  useEffect(() => {}, []);
  return (
    <DataGrid
      rows={rowData ?? []}
      columns={columns}
      pageSizeOptions={[10]}
      getRowId={(row) => row._id}
      //   hideFooter={true}
    />
  );
};
export default ScoreDataGrid;
