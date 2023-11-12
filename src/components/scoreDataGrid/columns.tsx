import { GridColDef } from "@mui/x-data-grid";

export function getColumns() {
  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "Username",
      width: 500,
      valueGetter: (params) => {
        console.log(params);
      },
    },
    {
      field: "score",
      headerName: "Score",
      width: 500,
    },
  ];
  return columns;
}
