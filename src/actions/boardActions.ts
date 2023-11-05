import { SELECT_TILE } from "./boardActionTypes";

export const selectTile = (row:number, col:number) => ({
    type: SELECT_TILE,
    payload: { row, col },
  });
  