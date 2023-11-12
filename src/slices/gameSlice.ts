// gameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createInitialBoard, performSwap, isLegalMove, Tile, processMatches } from '../gameLogic/gameLogicUtils';
import { startNewGame, updateGame } from '../thunks/gameServerThunks';

interface GameState {
  board: Tile[][];
  selectedTile: { x: number, y: number } | null;
  matches: Array<{ x: number, y: number }>;
  score: number;
}

const initialState: GameState = {
  board: createInitialBoard(),
  selectedTile: null,
  matches: [],
  score: 0,
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
        const matchResult = processMatches(state.board);
        state.board = matchResult.board;
        state.score += matchResult.score; 
        state.selectedTile = null;
      } else {
        state.selectedTile = null;
      }
    },
    startGame: (state, action: PayloadAction<string>) => {
      // Dispatch action to start a new game
      startNewGame(action.payload);
    },
    updateScore: (state, action: PayloadAction<{ gameId: number, token: string, score: number }>) => {
      const { gameId, token, score } = action.payload;
      // Update the score in the state
      state.score = score;
      // Dispatch action to update the game score
      updateGame(gameId, token, { score });
    },
  },
});

// Export actions
export const { selectTile, swapTiles } = gameSlice.actions;

// Export reducer
export default gameSlice.reducer;
