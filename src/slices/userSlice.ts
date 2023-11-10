// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  isCreatingUser: boolean;
  isUpdatingProfile: boolean;
  userData: any; // Define a more specific type if possible
  token: string | null;
  userId: number | null;
  error: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  isCreatingUser: false,
  isUpdatingProfile: false,
  userData: null,
  token: null,
  userId: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest(state) {
      state.isLoggedIn = false;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: any; token: string; userId: number }>) {
      state.isLoggedIn = true;
      state.userData = action.payload.user;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userData = null;
      state.token = null;
      state.userId = null;
      state.error = null;
    },
    setUserToken(state, action: PayloadAction<{ token: string; userId: number }>) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    createUserRequest(state) {
      state.isCreatingUser = true;
    },
    createUserSuccess(state, action: PayloadAction<any>) {
      state.isCreatingUser = false;
      state.userData = action.payload;
      state.error = null;
    },
    createUserFailure(state, action: PayloadAction<string>) {
      state.isCreatingUser = false;
      state.error = action.payload;
    },
    updateProfileRequest(state) {
      state.isUpdatingProfile = true;
    },
    updateProfileSuccess(state, action: PayloadAction<any>) {
      state.isUpdatingProfile = false;
      state.userData = action.payload;
      state.error = null;
    },
    updateProfileFailure(state, action: PayloadAction<string>) {
      state.isUpdatingProfile = false;
      state.error = action.payload;
    },
    getUserRequest(state) {
      state.isLoggedIn = false;
    },
    getUserSuccess(state, action: PayloadAction<any>) {
      state.isLoggedIn = true;
      state.userData = action.payload;
      state.error = null;
    },
    getUserFailure(state, action: PayloadAction<string>) {
      state.isLoggedIn = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  setUserToken,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  getUserRequest,
  getUserSuccess,
  getUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
