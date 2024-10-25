import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./slices/tasksSlice";
import { listsReducer } from "./slices/listsSlice";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    lists: listsReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(baseApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;