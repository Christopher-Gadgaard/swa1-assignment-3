// gameServerSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from './gameSlice';

interface GameServerState {
  loading: boolean;
  games: GameState[]; // Use the Game type here
  gameDetails: GameState | null; // Store the single game details here
  error: string | null;
}

const initialState: GameServerState = {
  loading: false,
  games: [],
  gameDetails: null,
  error: null,
};

const gameServerSlice = createSlice({
  name: 'gameServer',
  initialState,
  reducers: {
    getGamesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getGamesSuccess(state, action: PayloadAction<GameState[]>) {
      state.loading = false;
      state.games = action.payload;
      state.error = null;
    },
    getGamesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    postGameRequest(state) {
      state.loading = true;
      state.error = null;
    },
    postGameSuccess(state, action: PayloadAction<GameState>) {
      state.loading = false;
      state.games = [...state.games, action.payload];
      state.error = null;
    },
    postGameFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getGameByIdRequest(state) {
      state.loading = true;
      state.gameDetails = null;
      state.error = null;
    },
    getGameByIdSuccess(state, action: PayloadAction<GameState>) {
      state.loading = false;
      state.gameDetails = action.payload;
      state.error = null;
    },
    getGameByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateGameRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updateGameSuccess(state, action: PayloadAction<GameState>) {
      state.loading = false;
      state.games = state.games.map(game => 
        game.id === action.payload.id ? action.payload : game);
      state.error = null;
    },
    updateGameFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const {
  getGamesRequest,
  getGamesSuccess,
  getGamesFailure,
  postGameRequest,
  postGameSuccess,
  postGameFailure,
  getGameByIdRequest,
  getGameByIdSuccess,
  getGameByIdFailure,
  updateGameRequest,
  updateGameSuccess,
  updateGameFailure,
} = gameServerSlice.actions;

export default gameServerSlice.reducer;
