import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './Logic/AppNavigator';
import AuthStack from './btbuoi5/AuthStack';

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}