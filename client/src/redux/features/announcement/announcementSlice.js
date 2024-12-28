import { createSlice } from "@reduxjs/toolkit";



const announcementSlice = createSlice({
  name: "announcement",
  initialState: {
    announcement: {},
  },
  reducers: {
    setAnnouncement: (state, action) => {
      state.announcement = action.payload;
    },
  },
});

export const { setAnnouncement } = announcementSlice.actions;
export default announcementSlice.reducer;