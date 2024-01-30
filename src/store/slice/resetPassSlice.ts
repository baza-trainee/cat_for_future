import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IResetLigin {
	email: string;
}

const initialState: IResetLigin = {
	email: '',
};

const resetPassSlice = createSlice({
	name: 'resetEmail',
	initialState,
	reducers: {
		resetEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
	},
});

export const { resetEmail } = resetPassSlice.actions;
export default resetPassSlice.reducer;
