import { createSlice } from "@reduxjs/toolkit";



const departmentSlice = createSlice({
  name: "department",
  initialState: {
    dept: {},
  },
  reducers: {
    setDept: (state, action) => {
      state.dept = action.payload;
    },
   
  },
});

export const { setDept } = departmentSlice.actions;
export default departmentSlice.reducer;