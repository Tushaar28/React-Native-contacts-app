import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ViewContacts from "./screens/ViewContacts";
import Profile from "./screens/Profile";
import CreateContact from "./screens/CreateContact";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function MyStackNavigator(props) {
  return (
    <Stack.Navigator initialRouteName="ViewContacts">
      <Stack.Screen name="ViewContacts" component={ViewContacts} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="CreateContact" component={CreateContact} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="ViewContacts"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          // options={{ headerShown: false }}
          name="stack"
          component={(props) => <MyStackNavigator {...props} />}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
