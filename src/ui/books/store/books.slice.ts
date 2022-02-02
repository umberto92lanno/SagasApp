import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BookLists} from "../api/bookRepo";

export interface BooksReducer {
    list: BookLists[];
}

const initialState: BooksReducer = {
    list: [],
};

export const booksSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getBooksLoading: (state) => {
            return state;
        },
        getBooksSuccess: (state, action: PayloadAction<BookLists[]>) => ({
            ...state,
            list: action.payload,
        }),
        getBooksError:(state) => ({ ...state }),
        filterBooksList: (state) => ({
            ...state,
        }),
        getDefaultsCallLoading: (state) => ({ ...state }),
        // setToken: (state, action: PayloadAction<string>) => ({
        //     ...state,
        //     token: action.payload,
        // }),
    },
});

export const BooksActions = {
    ...booksSlice.actions,
};

export default booksSlice.reducer;
