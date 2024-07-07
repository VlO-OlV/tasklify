import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { List } from "../../types/List";

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
            const newList: List = {
                id: listId,
                name: action.payload,
            };
            state.lists.push(newList);
        },

        deleteListById: (state, action: PayloadAction<string>) => {
            state.lists = state.lists.filter((list) => list.id !== action.payload);
        },

        updateListById: (state, action: PayloadAction<List>) => {
            for (let i = 0; i < state.lists.length; i++) {
                if (state.lists[i].id === action.payload.id) {
                    state.lists[i] = {
                        ...action.payload
                    }
                }
            }
        },
    },
});

export const {createList, deleteListById, updateListById} = listsSlice.actions;
export const listsReducer = listsSlice.reducer;