import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    init: false,
    postList: [],
  },
  reducers: {
    setPostList: (state, action) => {
      // state.postList = [...action.payload];
      const testPostList = [
        {
          title: "Hello World Again",
          text: "Allo hahahhah",
          author: "0x2A70086F128E1951b5D7a32A9F1d176FC25BB801",
          answers: [1],
          tags: ["Travel", "Programming"],
          time: "Wed Dec 23 2020 03:07:40 GMT+0800 (Taipei Standard Time)",
          id: 0,
          tokens: 100,
        },
        {
          title: "Hello World",
          text: "I want to know how to solve r3vE3rse, wishMachine ...",
          author: "0xA621ac2553470963c155475001D1d4fff36eeD68",
          answers: [0, 2],
          tags: ["Course", "Exam", "Meme"],
          time: "Wed Dec 23 2020 02:24:03 GMT+0800 (Taipei Standard Time)",
          id: 1,
          tokens: 30,
        },
      ];
      state.init = true;
      while (state.postList.length < 20) {
        state.postList = [...state.postList, ...testPostList];
      }
    },
  },
});

export const { setPostList } = postSlice.actions;

export const selectPost = (state) => state.post;

export default postSlice.reducer;
