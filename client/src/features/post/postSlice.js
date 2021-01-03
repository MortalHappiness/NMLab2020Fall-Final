import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    init: false,
    postList: [],
  },
  reducers: {
    setPostList: (state, action) => {
      state.postList = action.payload.map((ele, id) => ({ ...ele, id }));
      // const testPostList = [
      //   {
      //     title: "Hello World Again",
      //     content: "Allo hahahhah",
      //     author: "0x2A70086F128E1951b5D7a32A9F1d176FC25BB801",
      //     tags: ["Travel", "Programming"],
      //     timestamp: "Wed Dec 23 2020 03:07:40 GMT+0800 (Taipei Standard Time)",
      //     tokens: 120,
      //   }]
    },
  },
});

export const { setPostList } = postSlice.actions;

export const selectPost = (state) => state.post;

export default postSlice.reducer;
