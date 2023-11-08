import { SELECT_SECOND_TILE } from "../actions/boardActionTypes";

const initialState = {
    selectedTile:{
        position:{
          row:undefined,
          col:undefined
        }
      }
  };
  
const tileToSwapReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case SELECT_SECOND_TILE:
            return {
            ...state,
            selectedTile: action.payload,
            };
        default:
            return state;
    }
}
export default tileToSwapReducer;