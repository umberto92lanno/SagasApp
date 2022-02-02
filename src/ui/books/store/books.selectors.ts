import {RootState} from "../../../store/rootStore";

export const getBooksListState = (state: RootState) => state.books.list;
