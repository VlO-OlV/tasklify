import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Task {
    id: string,
    name: string,
    description: string,
    deadline: Date,
    listId: string,
    priority: string,
    createdAt: Date,
}

export interface CreateTask {
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
        createTask: (state, action: PayloadAction<CreateTask>) => {
            const symbols: string = "qwertyuiopasdfghjklzxcvbnm1234567890_-"
            let taskId: string = "";
            for (let i: number = 0; i < 10; i++) {
                taskId += symbols[Math.floor(Math.random() * symbols.length)];
            }
            const newTask: Task = {id: taskId, ...action.payload};
            state.tasks.push(newTask);
        },

        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks.filter((task) => task.id != action.payload);
        },

        updateTask: (state, action: PayloadAction<Task>) => {
            state.tasks.map((task) => {
                if (task.id == action.payload.id) {
                    task = action.payload;
                }
            });
        },
    },
});

export const {createTask, removeTask, updateTask} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;