import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    init: false,
    postList: [],
  },
  reducers: {
    setPostList: (state, action) => {
      state.postList = action.payload
        .map((ele, id) => ({ ...ele, id }))
        .slice()
        .reverse();
    },
  },
});

export const { setPostList } = postSlice.actions;

export const selectPost = (state) => state.post;

export default postSlice.reducer;
