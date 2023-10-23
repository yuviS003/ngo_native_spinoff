import React from "react";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppBar from "./components/AppBar";
import CameraScreen from "./screens/Camera";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => <AppBar />, // Set the common header
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
