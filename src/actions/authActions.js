import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE
} from './authActionTypes';

// Login actions
export const loginRequest = () => ({
    type: LOGIN_REQUEST
});

export const loginSuccess = (userData) => ({
    type: LOGIN_SUCCESS,
    payload: userData
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
});

// Logout action
export const logout = () => ({
    type: LOGOUT
});

// Create user actions
export const createUserRequest = () => ({
    type: CREATE_USER_REQUEST
});

export const createUserSuccess = (userData) => ({
    type: CREATE_USER_SUCCESS,
    payload: userData
});

export const createUserFailure = (error) => ({
    type: CREATE_USER_FAILURE,
    payload: error
});