import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FlashMessage from "react-native-flash-message";

import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import ExplorerScreen from "./screens/ExplorerScreen";
import MessagesScreen from "./screens/MessagesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpHomeScreen from "./screens/SignUpHomeScreen";
import SignUpFormScreen from "./screens/SignUpFormScreen";
import AddQuestScreen from "./screens/AddQuestScreen";
import ListingScreen from "./screens/ListingScreen";
import ResultsScreen from "./screens/ResultsScreen";
import ImageScreen from "./screens/ImageScreen";
import MapScreen from "./screens/MapScreen";
import CameraScreen from "./screens/CameraScreen";
import ConversationsScreen from "./screens/ConversationsScreen";

import { FontAwesome5 } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import dataUser from "./reducers/dataUser";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const store = createStore(combineReducers({ dataUser }));

// app.locals.majFirst = (str) => {
//   return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
// };

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name == "Accueil") {
            iconName = "home";
          } else if (route.name == "Explorer") {
            iconName = "search-location";
          } else if (route.name == "Conversations") {
            iconName = "comments";
          } else if (route.name == "Profil") {
            iconName = "user";
          }

          return <FontAwesome5 name={iconName} size={25} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "#FBC531",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarStyle: [{ display: "flex", backgroundColor: "#2D98DA" }, null],
      })}>
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Explorer" component={ExplorerScreen} />
      <Tab.Screen name="Conversations" component={ConversationsScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUpHome" component={SignUpHomeScreen} />
          <Stack.Screen name="SignUpForm" component={SignUpFormScreen} />
          <Stack.Screen name="AddQuest" component={AddQuestScreen} />
          <Stack.Screen name="Listing" component={ListingScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen name="ImageScreen" component={ImageScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Messages" component={MessagesScreen} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </Provider>
  );
}
