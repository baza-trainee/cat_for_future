import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
	user: {
		email: string;
		password: string;
	};
}

interface UserPayload {
	email: string;
	password: string;
}

const initialState: UserState = {
	user: {
		email: '',
		password: '',
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserData: (state, action: PayloadAction<UserPayload>) => {
			const { email, password } = action.payload;
			state.user.email = email;
			state.user.password = password;
		},
	},
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
