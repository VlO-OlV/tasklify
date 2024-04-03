import { createSlice } from "@reduxjs/toolkit";

export interface List {
    id: string,
    name: string,
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
        createList: (state, action) => {

        },

        removeList: (state, action) => {

        },

        updateList: (state, action) => {

        },
    },
});

export const {createList, removeList, updateList} = listsSlice.actions;
export const listsReducer = listsSlice.reducer;