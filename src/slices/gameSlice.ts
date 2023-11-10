// gameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createInitialBoard, performSwap, findMatches, dropDownTiles, isLegalMove } from '../gameLogic/gameLogicUtils';
import { Tile, TileType } from '../reducers/gameLogicReducer';

interface GameState {
  board: Tile[][];
  selectedTile: { x: number, y: number } | null;
  matches: Array<{ x: number, y: number }>;
}

const initialState: GameState = {
  board: createInitialBoard(),
  selectedTile: null,
  matches: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    selectTile: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.selectedTile = action.payload;
    },
    swapTiles: (state, action: PayloadAction<{ firstTile: { x: number; y: number }; secondTile: { x: number; y: number } }>) => {
      const { firstTile, secondTile } = action.payload;
      if (isLegalMove(state.board, firstTile, secondTile)) {
        state.board = performSwap(state.board, firstTile, secondTile);
        state.matches = findMatches(state.board);
        state.board = dropDownTiles(state.board, state.matches);
        // More logic to handle the aftermath of swapping can be added here
      }
    },
    // You can add more reducers for other actions
  },
});

// Export actions
export const { selectTile, swapTiles } = gameSlice.actions;

// Export reducer
export default gameSlice.reducer;
