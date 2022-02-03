import {takeLeading, put, call, takeEvery, select, race, take, cancel} from 'typed-redux-saga';
import {BooksActions} from "./books.slice";
import {getBooksLists} from "../api/bookRepo";
import {getBooksListState} from "./books.selectors";
import {callApi} from "../../../utils/sagas/callApi";

function* getBooksList() {
    try {
        const response = yield* callApi(getBooksLists);
        // const response = yield* retry(3, 2000, getBooksLists);
        // const response = yield* call(getBooksLists);
        if (!response) {
            return;
        }
        yield* put(BooksActions.getBooksSuccess(response));
    } catch (error) {
        yield* put(BooksActions.getBooksError());
    }
}

function* filterBooksList() {
    const booksList = yield* select(getBooksListState);
    const booksListFilter = booksList.filter(recordBook => recordBook.updated === 'WEEKLY');
    console.log(booksListFilter);
}

function* getDefaultsCall() {
    yield* race([
        put(BooksActions.getBooksLoading()),
        put(BooksActions.filterBooksList()),
    ]);
    const action = yield* take([BooksActions.getBooksSuccess.type, BooksActions.getBooksError.type]);
    if (action.type === BooksActions.getBooksSuccess.type) {
        console.log(action);
    }
}

export default function* authSaga() {
    yield* takeLeading(BooksActions.getBooksLoading.type, getBooksList);
    yield* takeEvery(BooksActions.filterBooksList.type, filterBooksList);
    yield* takeLeading(BooksActions.getDefaultsCallLoading.type, getDefaultsCall);
}
