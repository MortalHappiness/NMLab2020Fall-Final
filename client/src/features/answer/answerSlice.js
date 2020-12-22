import { createSlice } from "@reduxjs/toolkit";

export const answerSlice = createSlice({
  name: "answer",
  initialState: {
    answerList: [],
  },
  reducers: {
    setAnswerList: (state, action) => {
      state.answerList = [
        {
          text: "You fucked Up",
          author: "Meme",
          votes: ["modo", "haiyaku", "meme"],
          time: "Wed Dec 23 2020 02:28:22 GMT+0800 (Taipei Standard Time)",
        },
      ];
    },
  },
});

export const { setAnswerList } = answerSlice.actions;

export const selectAnswer = (state) => state.answer;

export default answerSlice.reducer;
