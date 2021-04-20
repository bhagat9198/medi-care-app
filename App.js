import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

import React from 'react';
import thunk from 'redux-thunk';

import {Provider} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';

import StartingScreen from './screens/StartingScreen';
import authReducer from './store/reducers/auth';
import appReducer from './store/reducers/app';

const rootReducer = combineReducers({
  authReducer: authReducer,
  appReducer: appReducer,
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
