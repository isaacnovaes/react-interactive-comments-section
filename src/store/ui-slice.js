import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = { loading: true };

const uiSlice = createSlice({
	name: "ui",
	initialState: uiInitialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
		},
	},
});

export const uiSliceAction = uiSlice.actions;
export default uiSlice;
