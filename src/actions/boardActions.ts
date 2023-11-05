import { SELECT_SECOND_TILE, SELECT_TILE } from "./boardActionTypes";

export const selectTile = (row:number, col:number) => ({
    type: SELECT_TILE,
    payload: { row, col },
  });
  export const selectSecondTile = (row:number, col:number) => ({
    type: SELECT_SECOND_TILE,
    payload: { row, col },
  });
  