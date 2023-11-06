//index.ts
import { combineReducers } from "redux";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_USER_TOKEN,
  LOGOUT,
  CREATE_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  GET_USER_REQUEST,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
} from "../actions/userActionTypes";

// Initial state for the user reducer
const initialState = {
  isLoggedIn: false,
  isCreatingUser: false,
  userData: null,
  token: null,
  userId: null,
  error: null,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoggedIn: false, error: null };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload,
        error: null,
      };

    case LOGIN_FAILURE:
      return { ...state, isLoggedIn: false, error: action.payload };

    case SET_USER_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };

    case LOGOUT:
      return { ...initialState };

    case GET_USER_REQUEST:
      return { ...state, isLoggedIn: false, error: null };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload,
        error: null,
      };

    case GET_USER_FAILURE:
      return { ...state, isLoggedIn: true, error: action.payload };

    case CREATE_USER_REQUEST:
      return { ...state, isCreatingUser: true, error: null };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isCreatingUser: false,
        userData: action.payload,
        error: null,
      };

    case CREATE_USER_FAILURE:
      return { ...state, isCreatingUser: false, error: action.payload };

    case UPDATE_PROFILE_REQUEST:
      return { ...state, isUpdatingProfile: true, error: null };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isUpdatingProfile: false,
        userData: action.payload,
        error: null,
      };

    case UPDATE_PROFILE_FAILURE:
      return { ...state, isUpdatingProfile: false, error: action.payload };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers as you create them
});

export default rootReducer;

// Define the RootState type for later use in mapStateToProps or selectors
export type RootState = ReturnType<typeof rootReducer>;
