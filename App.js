
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StartingScreen from "./screens/StartingScreen";

import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./store/reducers/auth";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
 
const rootReducer = combineReducers({
  authReducer: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {

  return (
    <Provider store={store}>
      <StartingScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
