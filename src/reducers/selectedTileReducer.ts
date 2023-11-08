// selectedTileReducer.js

import { SELECT_TILE } from "../actions/boardActionTypes";

// Reducer
const initialState = {
  selectedTile:{
    position:{
      row:undefined,
      col:undefined
    }
  }
};


const selectedTileReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case SELECT_TILE:
      return {
        ...state,
        selectedTile: action.payload,
      };
    default:
      return state;
  }
};


export default selectedTileReducer;
