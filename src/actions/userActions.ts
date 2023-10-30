import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    SET_USER_TOKEN
} from './userActionTypes';

export const loginRequest = () => ({
    type: LOGIN_REQUEST
});

export const loginSuccess = (userData: any) => ({
    type: LOGIN_SUCCESS,
    payload: userData
});

export const loginFailure = (error: string) => ({
    type: LOGIN_FAILURE,
    payload: error
});

export const logout = () => ({
    type: LOGOUT
});

export const createUserRequest = () => ({
    type: CREATE_USER_REQUEST
});

export const createUserSuccess = (userData: any) => ({
    type: CREATE_USER_SUCCESS,
    payload: userData
});

export const createUserFailure = (error: string) => ({
    type: CREATE_USER_FAILURE,
    payload: error
});

export const setUserToken = (token: string, userId: number) => ({
    type: SET_USER_TOKEN,
    payload: { token, userId }
});

