import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeStack } from './HomeStack';

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}