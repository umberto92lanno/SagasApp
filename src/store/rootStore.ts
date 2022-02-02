import {applyMiddleware, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import booksReducer from '../ui/books/store/books.slice';
import rootSaga from "./rootSaga";
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, logger];

export const rootStore = configureStore({
    reducer: {
        books: booksReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(...middlewares),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootStore.getState>;

export type AppDispatch = typeof rootStore.dispatch;
