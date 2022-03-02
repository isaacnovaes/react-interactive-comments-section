import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "./comment-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
	reducer: { comment: commentSlice.reducer, ui: uiSlice.reducer },
});

export default store;
