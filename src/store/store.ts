import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "./logger";
import todosReducer from './slice/exampleSlices';

const rootReduser = combineReducers({
    todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReduser>;

const store = configureStore({
    reducer: rootReduser,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger]),
});

export default store;