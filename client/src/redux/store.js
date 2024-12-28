import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer from "./features/auth/authSlice"
import announcementReducer from "./features/announcement/announcementSlice"
import { apiSlice } from "./api/apiSlice";
import branchReducer from "./features/branch/branchSlice"
import departmentReducer from "./features/department/departmentSlice"

const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
      announcement: announcementReducer,
      branch: branchReducer,
      department: departmentReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  });
  
  setupListeners(store.dispatch);
  export default store;