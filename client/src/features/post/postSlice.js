import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    postList: [],
  },
  reducers: {
    setPostList: (state, action) => {
      console.log(action.payload);
      state.postList = [...action.payload];
    },
  },
});

export const { setPostList } = postSlice.actions;

export const selectPost = (state) => state.post;

export default postSlice.reducer;
