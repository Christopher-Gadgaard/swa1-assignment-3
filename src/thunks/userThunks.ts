//userThunks.ts
import { Dispatch } from 'redux';
import { loginRequest, loginSuccess, loginFailure, setUserToken, logout, createUserRequest, createUserSuccess, createUserFailure, updateProfileRequest, updateProfileSuccess, updateProfileFailure, getUserRequest, getUserSuccess, getUserFailure } from '../slices/userSlice';

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
                dispatch(setUserToken({ token: data.token, userId: data.userId }));
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
            const response = await fetch(`http://localhost:9090/logout?token=${token}`, {
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
                dispatch(setUserToken({ token: data.token, userId: data.userId }));
            } else {
                dispatch(createUserFailure("Unknown error during user creation."));
            }

        } catch (error) {
            dispatch(createUserFailure("Network error. Please try again."));
        }
    };
};


export const updateUserProfile = (token: string, userId: number, updatedData: any) => {
    return async (dispatch: Dispatch) => {
      dispatch(updateProfileRequest());
  
      // Remove properties that should not be sent in the request body
      const { id, username, admin, ...updateData } = updatedData;
  
      try {
        const response = await fetch(`http://localhost:9090/users/${userId}?token=${token}`, {
          method: 'PATCH', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData)
        });
  
        if (response.ok) {
          const data = await response.json();
          dispatch(updateProfileSuccess(data));
        } else {
          const errorData = await response.json();
          dispatch(updateProfileFailure(errorData.error || "Error updating profile."));
        }
  
      } catch (error) {
        dispatch(updateProfileFailure("Network error. Please try again."));
      }
    };
  };

export const getUserProfile = (token: string, userId: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(getUserRequest());
 
        try {
            const response = await fetch(`http://localhost:9090/users/${userId}?token=${token}`);
            
            if (response.ok) {
                const data = await response.json();
                dispatch(getUserSuccess(data));
            } else {
                dispatch(getUserFailure("Error getting profile."));
            }

        } catch (error) {
            dispatch(getUserFailure("Network error. Please try again."));
        }
    };
};