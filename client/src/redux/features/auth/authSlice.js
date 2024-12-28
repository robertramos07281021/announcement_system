import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  token: localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token")) : null,
  allUsers: [],
  user: {},

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    removeUser:(state)=> {
      state.user = {}
    }
    
  },
});

export const { 
  setCredentials, 
  logout, 
  setToken, 
  setAllUsers, 
  setUser,
  removeUser
} = authSlice.actions;
export default authSlice.reducer;