// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import gameSlice from '../slices/gameSlice'; 

const rootReducer = combineReducers({
  user: userReducer,
  game: gameSlice, // Use the slice reducer for the game logic
  // ... add other slice reducers as you create them
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
