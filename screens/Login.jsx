import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://covalenttechnology.co.in/test";

const Login = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

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
        setIsLoading(false);
      });
  };

  const handleLogin = () => {
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
          console.log("then--> ", response.data.data);
          authenticateUser(response.data.data);
        })
        .catch((error) => {
          console.log("catch--> ", error.message);
          console.log("catch--> ", error.response.data);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (await AsyncStorage.getItem("ngoUserInfo")) {
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
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        elevation={4}
        style={{ backgroundColor: "green" }}
        action={{
          label: "X",
          //   onPress: () => {
          //     // Do something
          //   },
        }}
      >
        Hey there! I'm a Snackbar.
      </Snackbar>
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
