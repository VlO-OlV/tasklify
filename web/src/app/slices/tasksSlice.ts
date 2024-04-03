import { createSlice } from "@reduxjs/toolkit";

export interface Task {
    id: string,
    name: string,
    description: string,
    deadline: Date,
    listId: string,
    priority: string,
    createdAt: Date,
}

interface TasksState {
    tasks: Task[],
}

const initialState: TasksState = {
    tasks: [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        createTask: (state, action) => {

        },

        removeTask: (state, action) => {

        },

        updateTask: (state, action) => {

        },
    },
});

export const {createTask, removeTask, updateTask} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;