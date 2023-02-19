import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counter-slice";
import todoListReducer from "../features/todolist/todolist-slice";

export const store = configureStore({
    reducer: {
        // state.counter field
        counter: counterReducer,
        todoList: todoListReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;