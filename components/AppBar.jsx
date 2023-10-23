import { Appbar } from "react-native-paper";
import React from "react";
import { StyleSheet } from "react-native";

const AppBar = ({ navigation }) => {
  return (
    <Appbar.Header style={styles.appBar} elevated={10}>
      <Appbar.Content title="Welcome, Trapper 👋" color="white" />
      <Appbar.Action
        icon="account-circle"
        color="white"
        size={35}
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </Appbar.Header>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "#1976D2",
    width: "100%",
  },
});
