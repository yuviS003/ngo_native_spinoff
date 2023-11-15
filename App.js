import React, { useEffect, useState } from "react";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppBar from "./components/AppBar";
import CameraScreen from "./screens/Camera";
import { AppContextProvider } from "./context/AppContext";
import DogStepper from "./screens/Sterilization/create/DogStepper";
import DogView from "./screens/Sterilization/view/DogView";
import DogStrlStatusChange from "./screens/Sterilization/modify_status/DogStrlStatusChange";
import FlashMessage from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "react-native";
import { bluePrHEX } from "./constants";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await AsyncStorage.getItem("ngoUserInfo");
      if (userInfo) setUserInfo(JSON.parse(userInfo));
    };
    fetchUserInfo();
  }, []);

  return (
    <AppContextProvider>
      <StatusBar backgroundColor={bluePrHEX} networkActivityIndicatorVisible />
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
              header: () => (
                <AppBar
                  appBarTitle={`Welcome, ${userInfo?.userName} 👋`}
                  showBackButton={false}
                />
              ),
            })}
          />
          <Stack.Screen
            name="createDogStrl"
            component={DogStepper}
            options={({ route }) => ({
              header: () => (
                <AppBar appBarTitle="New Dog Case" showBackButton={true} />
              ),
            })}
          />
          <Stack.Screen
            name="viewDogStrl"
            component={DogView}
            options={({ route }) => ({
              header: () => (
                <AppBar appBarTitle="View Dog Cases" showBackButton={true} />
              ),
            })}
          />
          <Stack.Screen
            name="changeStatusDogStrl"
            component={DogStrlStatusChange}
            options={({ route }) => ({
              header: () => (
                <AppBar appBarTitle="Modify Dog Cases" showBackButton={true} />
              ),
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
      <FlashMessage position="top" />
    </AppContextProvider>
  );
}
