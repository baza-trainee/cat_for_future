import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IOpenLogin {
	isOpen: boolean;
}

const initialState: IOpenLogin = {
	isOpen: false,
};

const showLoginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		showLogin: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
	},
});

export const { showLogin } = showLoginSlice.actions;
export default showLoginSlice.reducer;
