import { GridColDef } from "@mui/x-data-grid";
import IconType1 from "../../images/atronaut-svgrepo-com.svg";
import IconType2 from "../../images/brain-slug-svgrepo-com.svg";

export function getColumns(userId: number | null) {
  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "Username",
      width: 500,
      renderCell: (params) => {
        if (params.row.user === userId) {
          return (
            <div
              style={{
                display: "flex",
              }}
            >
              <img
                src={IconType1}
                style={{
                  width: "30px",
                  height: "30px",
                }}
                alt="astro"
              />
              <div style={{ color: "red" }}>You</div>
            </div>
          );
        } else {
          return (
            <div
              style={{
                display: "flex",
              }}
            >
              <img
                src={IconType2}
                style={{
                  width: "30px",
                  height: "30px",
                }}
                alt="astro"
              />
              <div>Annonymous Alien</div>
            </div>
          );
        }
      },
    },
    {
      field: "score",
      headerName: "Score",

      width: 500,
      valueGetter: (params) => {
        return params.row.score;
      },
    },
  ];
  return columns;
}
