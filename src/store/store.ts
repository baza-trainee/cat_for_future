import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import showLoginReducer from './slice/showLoginSlice';
import setUserReducer from './slice/userSlice.ts';
import { apiSlice } from 'src/app/api/apiSlice.ts';
import { authApiSlice } from 'src/store/slice/authApiSlice.ts';
import { userApiSlice } from 'src/store/slice/userApiSlice.ts';

const rootReducer = combineReducers({
	showLogin: showLoginReducer,
	setUserData: setUserReducer,
	[authApiSlice.reducerPath]: authApiSlice.reducer,
	[userApiSlice.reducerPath]: userApiSlice.reducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
