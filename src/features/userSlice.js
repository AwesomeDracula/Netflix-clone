import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    plan: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setUserPlan: (state, action) => {
      state.plan = action.payload;
    }
  },
});

export const { login, logout, setUserPlan } = userSlice.actions;

export const selectUser = state => state.user.user;
export const selectUserPlan = state => state.user.plan;

export default userSlice.reducer;
