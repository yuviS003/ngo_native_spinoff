import { Appbar } from "react-native-paper";
import React from "react";
import { StyleSheet } from "react-native";
import { bluePrHEX } from "../constants";
import { useNavigation } from "@react-navigation/native";

const AppBar = ({ showBackButton, appBarTitle }) => {
  const navigation = useNavigation();
  return (
    <Appbar.Header style={styles.appBar} elevated={10}>
      {showBackButton && (
        <Appbar.BackAction
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}
      <Appbar.Content title={appBarTitle} color="white" />
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
    backgroundColor: bluePrHEX,
    width: "100%",
  },
});
