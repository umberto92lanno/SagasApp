import {memo, useEffect} from "react";
import {Button, View} from "react-native";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {BooksActions} from "../../../ui/books/store/books.slice";

export const FakeScreen = memo(() => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(BooksActions.getDefaultsCallLoading());
    }, [dispatch]);

    const onPressCall = () => {
        dispatch(BooksActions.getBooksLoading());
    };
    const onPressFilter = () => {
        dispatch(BooksActions.filterBooksList());
    };
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Call" onPress={onPressCall} />
          <Button title="Filter Books" onPress={onPressFilter} />
      </View>
    );
});
