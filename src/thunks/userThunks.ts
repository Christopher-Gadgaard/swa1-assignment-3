//userThunks.ts
import { Dispatch } from 'redux';
import { loginRequest, loginSuccess, loginFailure, setUserToken, logout, createUserRequest, createUserSuccess, createUserFailure, updateProfileRequest, updateProfileSuccess, updateProfileFailure } from '../actions/userActions';

export const loginUser = (username: string, password: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(loginRequest());

        try {
            const response = await fetch('http://localhost:9090/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(loginSuccess(data));
                dispatch(setUserToken(data.token, data.userId));
            } else {
                dispatch(loginFailure(data.error || "Unknown error during login."));
            }

        } catch (error) {
            dispatch(loginFailure("Network error. Please try again."));
        }
    };
};

export const logoutUser = (token: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await fetch(`/logout?token=${token}`, {
                method: 'POST'
            });

            if (!response.ok) {
                dispatch(loginFailure("Error logging out. Please try again."));
            } else {
                dispatch(logout());
            }

        } catch (error) {
            dispatch(loginFailure("Network error. Please try again."));
        }
    };
};

export const createUser = (username: string, password: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(createUserRequest());

        try {
            const response = await fetch('http://localhost:9090/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });       
                   
            if (response.ok) {
                const data = await response.json();
                dispatch(createUserSuccess(data));
                dispatch(setUserToken(data.token, data.userId));
            } else {
                dispatch(createUserFailure("Unknown error during user creation."));
            }

        } catch (error) {
            dispatch(createUserFailure("Network error. Please try again."));
        }
    };
};


export const updateUserProfile = (userId: number, updatedData: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateProfileRequest());

        try {
            const response = await fetch(`http://localhost:9090/users/${userId}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(updateProfileSuccess(data));
            } else {
                dispatch(updateProfileFailure("Error updating profile."));
            }

        } catch (error) {
            dispatch(updateProfileFailure("Network error. Please try again."));
        }
    };
};

