import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	user:
		typeof window !== "undefined"
			? JSON.parse(localStorage.getItem("user") || "null")
			: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<any>) => {
			state.user = action.payload;
			if (typeof window !== "undefined") {
				localStorage.setItem("user", JSON.stringify(action.payload));
			}
		},
		clearUser: (state) => {
			state.user = null;
			if (typeof window !== "undefined") {
				localStorage.removeItem("user");
			}
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
