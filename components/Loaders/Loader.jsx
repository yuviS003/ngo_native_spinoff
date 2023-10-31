import { Text, View } from "react-native";
import React from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const Loader = () => {
  return (
    <View
      style={{
        height: 500,
        alignContent: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <ActivityIndicator animating={true} color={MD2Colors.blue800} size={60} />
      <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "800" }}>
        Loading....
      </Text>
    </View>
  );
};

export default Loader;
