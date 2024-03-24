import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import gptReducer from "./gptSlice.js";
const appStore = configureStore({
  reducer: {
    gpt: gptReducer,
  },
});
export default appStore;
