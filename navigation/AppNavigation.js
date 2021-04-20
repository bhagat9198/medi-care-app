/* eslint-disable */

// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import StartingScreen from './../screens/StartingScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={StartingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
