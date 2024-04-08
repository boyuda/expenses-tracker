import { createSlice } from '@reduxjs/toolkit';

interface IUser {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface IInitialState {
  currentUser: IUser | null;
  error: string | null;
  loading: boolean;
}

const initialState: IInitialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  // Reducers are pure functions that handle state logic, accepting the
  // initial state and action type to update and return the state
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutSuccess,
} = userSlice.actions;
export default userSlice.reducer;
