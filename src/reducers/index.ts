import { combineReducers } from 'redux';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    SET_USER_TOKEN, LOGOUT
} from '../actions/userActionTypes';

// Initial state for the user reducer
const initialState = {
    isLoggedIn: false,
    userData: null,
    token: null,
    userId: null,
    error: null
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, isLoggedIn: false, error: null };

        case LOGIN_SUCCESS:
            return { ...state, isLoggedIn: true, userData: action.payload, error: null };

        case LOGIN_FAILURE:
            return { ...state, isLoggedIn: false, error: action.payload };

        case SET_USER_TOKEN:
            return { ...state, token: action.payload.token, userId: action.payload.userId };

        case LOGOUT:
            return { ...initialState };

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
