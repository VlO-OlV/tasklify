import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./slices/tasksSlice";
import { listsReducer } from "./slices/listsSlice";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        lists: listsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;