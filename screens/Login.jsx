import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const API_BASE_URL = "https://covalenttechnology.co.in/test";

const Login = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authenticateUser = (userDetails) => {
    const TOKEN = userDetails.token;
    console.log("user details in auth func--> ", userDetails);
    console.log("token--> ", TOKEN);
    axios
      .get(`${API_BASE_URL}/login`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then(async (response) => {
        console.log("then--> ", response.data);
        console.log(response.data.auth);
        const authObject = {
          userId: response.data.auth.id,
          userName: response.data.auth.username,
          email: response.data.auth.email,
          role: response.data.auth.role.split(","),
          token: TOKEN,
        };
        console.log("authObject--> ", JSON.stringify(authObject));
        await AsyncStorage.setItem("ngoUserInfo", JSON.stringify(authObject));
        navigation.navigate("Home");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("catch--> ", error.message);
        console.log("catch--> ", error.response.data);
        showMessage({
          message: "ERROR",
          description: error.response.data.message.toUpperCase(),
          type: "danger",
        });
        setIsLoading(false);
      });
  };

  const handleLogin = () => {
    if (!userName.length) {
      showMessage({
        message: "USERNAME EMPTY",
        description: "Please enter your username",
        type: "danger",
      });
      return;
    }
    if (!password.length) {
      showMessage({
        message: "PASSWORD EMPTY",
        description: "Please enter your password",
        type: "danger",
      });
      return;
    }
    if (password.length < 6) {
      showMessage({
        message: "PASSWORD TOO SHORT",
        description: "Password must contain at least 6 characters",
        type: "info",
      });
      return;
    }
    if (userName.length && password.length) {
      console.log(API_BASE_URL);
      console.log(userName, password);
      const payload = {
        username: userName,
        password: password,
      };
      setIsLoading(true);
      axios
        .post(`${API_BASE_URL}/login`, JSON.stringify(payload), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("/login then--> ", response);
          console.log("/login then--> ", response.data.data);
          authenticateUser(response.data.data);
        })
        .catch((error) => {
          console.error("/login catch--> ", error);
          showMessage({
            message: "ERROR",
            description: error.response.data.message.toUpperCase(),
            type: "danger",
          });
          console.error("/login catch--> ", error.response.data);
          setIsLoading(false);
        });
    }
  };

  const showSuccessSnackbar = () => {
    showMessage({
      message: "Success",
      description: "This is a success message.",
      type: "success",
    });
  };

  const showErrorSnackbar = () => {
    showMessage({
      message: "Error",
      description: "This is an error message.",
      type: "danger",
    });
  };

  const showWarningSnackbar = () => {
    showMessage({
      message: "Warning",
      description: "This is a warning message.",
      type: "warning",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await AsyncStorage.getItem("ngoUserInfo");
      console.log("user info", userInfo);
      if (userInfo) {
        navigation.navigate("Home");
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/afa_logo_white.png")} // Use the correct path to your image
        style={{ width: 100, height: 100 }}
      />
      <Text style={styles.headerTxt}>LOGIN</Text>
      <TextInput
        label="Username"
        style={styles.inpField}
        placeholder="Enter your username"
        outlineColor="#1976D2"
        disabled={isLoading}
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />
      <TextInput
        label="Password"
        style={styles.inpField}
        placeholder="Enter your password"
        outlineColor="#1976D2"
        secureTextEntry={true} // This makes the input field for password
        disabled={isLoading}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        mode="contained"
        style={styles.btnStyle}
        onPress={() => handleLogin()}
        loading={isLoading}
      >
        <Text style={{ fontSize: 18 }}>Submit</Text>
      </Button>
      {/* <FlashMessage position="top" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  inpField: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: "#eafffe",
  },
  headerTxt: {
    fontSize: 30,
    fontWeight: "600",
  },
  btnStyle: {
    width: "80%",
    maxWidth: 400,
    borderRadius: 18,
    backgroundColor: "#1976D2",
    marginTop: 15,
  },
});

export default Login;
