import React from "react";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} // This line hides the header
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }} // This line hides the header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
