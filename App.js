import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ViewContacts from './screens/ViewContacts';
import Profile from './screens/Profile';
import CreateContact from './screens/CreateContact';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'ViewContacts'>
        <Stack.Screen name='ViewContacts' component={ViewContacts} />
        <Stack.Screen name='Profile' component={ Profile} />
        <Stack.Screen name='CreateContact' component={ CreateContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}