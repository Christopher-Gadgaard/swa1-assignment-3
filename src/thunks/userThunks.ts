import { Dispatch } from 'redux';
import { loginRequest, loginSuccess, loginFailure, setUserToken, logout } from '../actions/userActions';

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
                dispatch(loginFailure(data.error));
            }

        } catch (error) {
           // dispatch(loginFailure(error.message));
        }
    };
};

export const logoutUser = (token: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await fetch(`/logout?token=${token}`, {
                method: 'POST'
            });

            if (response.ok) {
                dispatch(logout());
            } else {
                // Handle logout failure if needed
            }

        } catch (error) {
            // Handle error during logout if needed
        }
    };
};
