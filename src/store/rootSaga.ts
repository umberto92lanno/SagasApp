import { all } from 'redux-saga/effects';
import booksSaga from '../ui/books/store/books.sagas';

export default function* rootSaga() {
    yield all([booksSaga()]);
}
