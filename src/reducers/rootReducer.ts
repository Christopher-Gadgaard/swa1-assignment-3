//rootReducer 
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import gameReducer from "./gameReducer";
import selectedTileReducer from "./selectedTileReducer";
import tileToSwapReducer from "./tileToSwapReducer";
import gameLogicReducer from "./gameLogicReducer";

const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
  gameLogic: gameLogicReducer,
  selectedTile: selectedTileReducer,
  tileToSwap: tileToSwapReducer,
  // Add other reducers as you create them
});

export default rootReducer;

// Define the RootState type for later use in mapStateToProps or selectors
export type RootState = ReturnType<typeof rootReducer>;
