
// gameLogicThunks.ts

import { Dispatch } from 'redux';
import { selectTile, swapTiles, removeMatches, dropTiles } from '../actions/gameLogicActions';
import { RootState } from '../reducers/rootReducer';
import { Tile } from '../reducers/gameLogicReducer'; 
import { findMatches, performSwap, dropDownTiles } from '../gameLogic/gameLogicUtils'; 

// Thunk for making a move
export const makeMove = (firstTile: { x: number, y: number }, secondTile: { x: number, y: number }) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const state: RootState = getState();

    // Now we're using state.gameLogic to access the game logic state
    if (isLegalMove(state.gameLogic.board, firstTile, secondTile)) {
      dispatch(swapTiles(firstTile, secondTile));
      const newBoard = performSwap(state.gameLogic.board, firstTile, secondTile);

      // Find matches
      const matches = findMatches(newBoard);
      if (matches.length > 0) {
        dispatch(removeMatches(matches));

        // Drop down tiles and fill the empty spaces with new tiles
        const updatedBoard = dropDownTiles(newBoard, matches);
        dispatch(dropTiles());

        // If new matches are created from dropping, continue the process
        // This may involve recursive checks or a while loop until there are no more matches
        // ...
      }
    }

    // If the move was not legal or no matches were found, you may want to dispatch an action to clear the selection or handle it accordingly
  };
};

// A utility function to check if the move is legal
// We're assuming this function is defined in gameLogicUtils.ts and imported above


// A utility function to check if the move is legal (to be created in gameLogicUtils.ts)
const isLegalMove = (board: Tile[][], firstTile: { x: number, y: number }, secondTile: { x: number, y: number }): boolean => {
    // Logic to determine if the move is legal
    // Returns true if legal, false otherwise
    return true; // Replace with your logic
};
