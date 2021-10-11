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
import EditContact from "./screens/EditContact";
import FavouriteContacts from "./screens/FavouriteContacts";
import { Provider } from "react-redux";
import store from "./redux/store";

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
      <Stack.Screen name="EditContact" component={EditContact} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="ViewContacts"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            // options={{ headerShown: false }}
            name="Drawer"
            component={(props) => <MyStackNavigator {...props} />}
          />
          <Drawer.Screen
            // options={{ headerShown: false }}
            name="Favourites"
            component={(props) => <FavouriteContacts {...props} />}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
