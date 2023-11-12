// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import gameSlice from '../slices/gameSlice'; 
import gameServerSlice from '../slices/gameServerSlice';

const rootReducer = combineReducers({
  user: userSlice,
  gameLogic: gameSlice, 
  gameServer: gameServerSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
