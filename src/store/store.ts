import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import logger from './logger';
import todosReducer from './slice/exampleSlices';
import showLoginReducer from './slice/showLoginSlice';

const rootReduser = combineReducers({
	todos: todosReducer,
	showLogin: showLoginReducer,
});

const store = configureStore({
	reducer: rootReduser,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger]),
});

export default store;

export type RootState = ReturnType<typeof rootReduser>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
