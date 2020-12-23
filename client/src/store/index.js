import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import answerReducer from "../features/answer/answerSlice";
// import counterReducer from "../features/counter/counterSlice";

export default configureStore({
  reducer: {
    // counter: counterReducer,
    post: postReducer,
    answer: answerReducer,
  },
});
