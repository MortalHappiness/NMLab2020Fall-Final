import { createSlice } from "@reduxjs/toolkit";

export const answerSlice = createSlice({
  name: "answer",
  initialState: {
    answerList: [],
  },
  reducers: {
    setAnswerList: (state, action) => {
      state.answerList = action.payload.slice().reverse();
    },
  },
});

export const { setAnswerList } = answerSlice.actions;

export const selectAnswer = (state) => state.answer;

export default answerSlice.reducer;
