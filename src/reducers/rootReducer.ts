// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import gameSlice from '../slices/gameSlice'; 

const rootReducer = combineReducers({
  user: userSlice,
  gameLogic: gameSlice, 
  // ... add other slice reducers as you create them
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
