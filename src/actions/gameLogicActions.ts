// gameLogicActions.ts

import {
    SELECT_TILE,
    SWAP_TILES,
    REMOVE_MATCHES,
    DROP_TILES,
  } from './gameLogicActionTypes';
  
  // Action to select a tile
  export const selectTile = (x: number, y: number) => ({
    type: SELECT_TILE,
    payload: { x, y },
  });
  
  // Action to swap two tiles
  export const swapTiles = (firstTile: { x: number, y: number }, secondTile: { x: number, y: number }) => ({
    type: SWAP_TILES,
    payload: { firstTile, secondTile },
  });
  
  // Action to remove matches from the board
  export const removeMatches = (matches: Array<{ x: number, y: number }>) => ({
    type: REMOVE_MATCHES,
    payload: { matches },
  });
  
  // Action to drop tiles after matches have been removed
  export const dropTiles = () => ({
    type: DROP_TILES,
    // payload can be added if needed, for example, to specify how many tiles to drop
  });
  