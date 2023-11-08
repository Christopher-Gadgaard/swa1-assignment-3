import { SELECT_SECOND_TILE, SELECT_TILE } from "./boardActionTypes";

export type Position ={
    row:number|undefined;
    col:number|undefined;
}
export const selectTile = (position:Position|undefined) => ({
    type: SELECT_TILE,
    payload: { position},
  });
  export const selectSecondTile = (position:Position|undefined) => ({
    type: SELECT_SECOND_TILE,
    payload: { position},
  });
  