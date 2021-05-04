/* eslint-disable */

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

import React from 'react';
import thunk from 'redux-thunk';

import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';

import StartingScreen from './screens/StartingScreen';
import authReducer from './store/reducers/auth';
import appReducer from './store/reducers/app';
import doctorReducer from './store/reducers/doctor';
import consultsReducer from './store/reducers/consults';
import diseasesDatasetReducer from './store/reducers/diseasesDataset';

const rootReducer = combineReducers({
  authReducer: authReducer,
  appReducer: appReducer,
  doctorReducer: doctorReducer,
  consultsReducer: consultsReducer,
  diseasesDatasetReducer: diseasesDatasetReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <StartingScreen />
    </Provider>
  );
}
