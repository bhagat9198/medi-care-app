import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

import React from 'react';
import { View, Text } from 'react-native';

export default function Dashboard() {
  return (
    <View>
      <Text>Dasbaord</Text>
    </View>
  )
}
