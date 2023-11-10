// gameLogicThunks.ts

import { AppDispatch, RootState } from '../store';
import { swapTiles } from '../slices/gameSlice'; // Import swapTiles action from gameSlice
import { performSwap, findMatches, dropDownTiles, isLegalMove } from '../gameLogic/gameLogicUtils';

// Thunk for making a move, now as a standard function, not a thunk
export const makeMove = (firstTile: { x: number, y: number }, secondTile: { x: number, y: number }) => 
(dispatch: AppDispatch, getState: () => RootState) => {
  const state: RootState = getState();

  // Access the game state from the correct slice
  const gameLogic = state.game; // Assuming your game slice is named 'game'

  if (isLegalMove(gameLogic.board, firstTile, secondTile)) {
    // Since swapTiles is now an action from the slice, you can just dispatch it
    dispatch(swapTiles({ firstTile, secondTile }));

    // Your swapTiles reducer will handle the board update, so you don't need to do it here
    // The reducer will also handle finding matches and dropping tiles
    // You should update the reducer to handle these additional side effects if it doesn't already
  }

  // If the move was not legal or no matches were found, you may want to update the state accordingly
  // This can be done by dispatching additional actions, which you would define in your slice
};

// Note: Since the actions and state structure might have changed with the introduction of Redux Toolkit,
// make sure to update the paths and action names according to your actual implementation.
