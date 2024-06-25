import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface List {
    id: string,
    name: string,
    numberOfTasks: number,
}

interface ListsState {
    lists: List[],
}

const initialState: ListsState = {
    lists: [],
}

export const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        createList: (state, action: PayloadAction<string>) => {
            const symbols: string = "qwertyuiopasdfghjklzxcvbnm1234567890_-"
            let listId: string = "";
            for (let i: number = 0; i < 10; i++) {
                listId += symbols[Math.floor(Math.random() * symbols.length)];
            }
            const newList: List = { id: listId, name: action.payload, numberOfTasks: 0 };
            state.lists.push(newList);
        },

        deleteListById: (state, action: PayloadAction<string>) => {
            state.lists.filter((list) => list.id != action.payload);
        },

        updateListById: (state, action: PayloadAction<List>) => {
            state.lists.map((list) => {
                if (list.id == action.payload.id) {
                    list = action.payload;
                }
            });
        },
    },
});

export const {createList, deleteListById, updateListById} = listsSlice.actions;
export const listsReducer = listsSlice.reducer;