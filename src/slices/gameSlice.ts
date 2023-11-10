// gameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createInitialBoard, performSwap, findMatches, dropDownTiles, isLegalMove, Tile } from '../gameLogic/gameLogicUtils';


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
    selectTile: (state, action: PayloadAction<{ x: number; y: number }|null>) => {
      state.selectedTile = action.payload;
    },
   swapTiles: (state, action: PayloadAction<{ firstTile: { x: number; y: number }; secondTile: { x: number; y: number } }>) => {
      const { firstTile, secondTile } = action.payload;
      if (isLegalMove(state.board, firstTile, secondTile)) {
        state.board = performSwap(state.board, firstTile, secondTile);
        state.matches = findMatches(state.board);
        state.board = dropDownTiles(state.board, state.matches);
        // Deselect the tile by setting the selectedTile to null after the swap
        state.selectedTile = null;
      } else {
        // If the move is not legal, also deselect the tile
        state.selectedTile = null;
      }
    },
    // You can add more reducers for other actions
  },
});

// Export actions
export const { selectTile, swapTiles } = gameSlice.actions;

// Export reducer
export default gameSlice.reducer;
