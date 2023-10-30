import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE
} from './authActionTypes';

const initialState = {
    isAuthenticated: false,
    userData: null,
    loading: false,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case CREATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case LOGIN_SUCCESS:
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                userData: action.payload,
                loading: false,
                error: null
            };

        case LOGIN_FAILURE:
        case CREATE_USER_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                userData: null,
                loading: false,
                error: action.payload
            };

        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                userData: null,
                loading: false,
                error: null
            };

        default:
            return state;
    }
};

export default authReducer;