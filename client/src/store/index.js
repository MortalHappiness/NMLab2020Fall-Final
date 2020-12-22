import { configureStore } from "@reduxjs/toolkit";
// import sessionReducer from "../features/session/sessionSlice";
import counterReducer from "../features/counter/counterSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    // session: sessionReducer,
  },
});
