import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { GameState } from "../../slices/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { fetchGames } from "../../thunks/gameServerThunks";
import { AppDispatch } from "../../store";

export interface Props {
  columns: GridColDef[];
  games: any[];
}
const ScoreDataGrid: React.FC<Props> = ({ columns }) => {
  const [rowData, setRowData] = useState<Array<GameState>>();
  const games = useSelector((state: RootState) => state.gameServer.games);
  const { token } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const currentUserId = useSelector((state: RootState) => state.user.userId);
  useEffect(() => {
    if (token) {
      dispatch(fetchGames(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    const userGames = games.filter((game) => game.user === currentUserId);
    const userTopThreeGames = userGames
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const topTenGames = games
      .filter((game) => !userTopThreeGames.includes(game))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10 - userTopThreeGames.length);

    const mergedGames = [...userTopThreeGames, ...topTenGames];
    setRowData(mergedGames);
  }, [games, currentUserId]);
  return (
    <DataGrid
      initialState={{
        sorting: {
          sortModel: [{ field: "score", sort: "desc" }],
        },
      }}
      rows={rowData ?? []}
      columns={columns}
      pageSizeOptions={[10]}
      getRowId={(row) => row.id}
      hideFooter={true}
    />
  );
};
export default ScoreDataGrid;
