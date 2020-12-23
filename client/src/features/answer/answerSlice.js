import { createSlice } from "@reduxjs/toolkit";

export const answerSlice = createSlice({
  name: "answer",
  initialState: {
    answerList: [],
  },
  reducers: {
    setAnswerList: (state, action) => {
      const testAnswerList = [
        {
          id: 0,
          text: "You fucked Up",
          author: "Meme",
          votes: ["modo", "haiyaku", "meme"],
          time: "Wed Dec 23 2020 02:28:22 GMT+0800 (Taipei Standard Time)",
        },
        {
          id: 1,
          text: "You fucked Up again",
          author: "Momo",
          votes: ["modo", "haiyaku"],
          time: "Wed Dec 23 2020 11:49:42 GMT+0800 (Taipei Standard Time)",
        },
        {
          id: 2,
          text: "You fucked Up again again",
          author: "Mama",
          votes: ["meme"],
          time: "Wed Dec 23 2020 11:49:30 GMT+0800 (Taipei Standard Time)",
        },
      ];
      state.answerList = testAnswerList.filter(({ id }) =>
        action.payload.includes(id)
      );
    },
  },
});

export const { setAnswerList } = answerSlice.actions;

export const selectAnswer = (state) => state.answer;

export default answerSlice.reducer;
