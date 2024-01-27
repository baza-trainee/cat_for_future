import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IOpenLogin {
	isOpen: boolean;
	isAdminOpen: boolean;
}

const initialState: IOpenLogin = {
	isOpen: false,
	isAdminOpen: false,
};

const showLoginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		showLogin: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
		showLoginAdmin: (state, action: PayloadAction<boolean>) => {
			state.isAdminOpen = action.payload;
		},
	},
});

export const { showLogin, showLoginAdmin } = showLoginSlice.actions;
export default showLoginSlice.reducer;
