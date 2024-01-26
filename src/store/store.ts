import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import todosReducer from './slice/exampleSlices';
import showLoginReducer from './slice/showLoginSlice';
import authReducer from './slice/authSlice.ts';
import { apiSlice } from 'src/app/api/apiSlice.ts';
import { authApiSlice } from 'src/store/slice/authApiSlice.ts';

const rootReducer = combineReducers({
	todos: todosReducer,
	showLogin: showLoginReducer,
	auth: authReducer,
	[authApiSlice.reducerPath]: authApiSlice.reducer,
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
