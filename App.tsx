import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from "react-redux";
import {rootStore} from "./src/store/rootStore";
import {FakeScreen} from "./src/shared/components/fakeScreen/fakeScreen";

export default function App() {
  return (
      <Provider store={rootStore}>
        <FakeScreen />
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
