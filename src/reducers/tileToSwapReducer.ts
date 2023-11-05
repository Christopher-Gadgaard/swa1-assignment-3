import { SELECT_SECOND_TILE } from "../actions/boardActionTypes";

const initialState = {
    selectedTileToSwap: null,
  };
  
const tileToSwapReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case SELECT_SECOND_TILE:
            return {
            ...state,
            selectedTileToSwap: action.payload,
            };
        default:
            return state;
    }
}
export default tileToSwapReducer;