import React from "react";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppBar from "./components/AppBar";
import CameraScreen from "./screens/Camera";
import { AppContextProvider } from "./context/AppContext";
import DogStepper from "./screens/Sterilization/create/DogStepper";
import DogView from "./screens/Sterilization/view/DogView";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator
        // screenOptions={{
        //   header: () => <AppBar />, // Set the common header
        // }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ route }) => ({
              header: () => <AppBar showBackButton={false} />,
            })}
          />
          <Stack.Screen
            name="createDogStrl"
            component={DogStepper}
            options={({ route }) => ({
              header: () => <AppBar showBackButton={true} />,
            })}
          />
          <Stack.Screen
            name="viewDogStrl"
            component={DogView}
            options={({ route }) => ({
              header: () => <AppBar showBackButton={true} />,
            })}
          />
          <Stack.Screen
            name="Camera"
            component={CameraScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}
