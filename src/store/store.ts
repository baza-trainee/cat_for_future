import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, Middleware } from "redux";

const rootReduser = combineReducers({

});

export type RootState = ReturnType<typeof rootReduser>;

const logger: Middleware<{}, RootState> = (state) => (next) => (action) => {
    console.group(action.type);
    console.info("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    console.groupEnd();
    return result;
};

const store = configureStore({
    reducer: rootReduser,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger]),
});

export default store;