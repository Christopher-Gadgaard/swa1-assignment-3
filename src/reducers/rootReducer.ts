//index.ts
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import gameReducer from "./gameReducer";


const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
  // Add other reducers as you create them
});

export default rootReducer;

// Define the RootState type for later use in mapStateToProps or selectors
export type RootState = ReturnType<typeof rootReducer>;
