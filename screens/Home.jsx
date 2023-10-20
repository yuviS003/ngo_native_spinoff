import React, { useState } from "react";
import { SafeAreaView, Text, Button, StyleSheet, View } from "react-native";
import { Appbar, IconButton } from "react-native-paper";
import PopUpModal from "../components/PopUpModal";

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appBar} elevated={10}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate("Login");
          }}
          color="white"
        />
        <Appbar.Content title="Welcome, Trapper 👋" color="white" />
      </Appbar.Header>
      <View style={styles.boxContainer}>
        <Text style={styles.boxHeading}>Sterilization</Text>
        <Text style={styles.boxSubHeading}>Total lives saved: 8</Text>
        <View style={styles.navBox}>
          <View style={styles.navBtn}>
            <IconButton
              icon="folder"
              mode="contained"
              iconColor="white"
              containerColor="#1976D2"
              size={45}
              style={styles.iconStyle}
              onPress={() => {
                console.log("Pressed");
                setModalVisible(true);
              }}
            />
            <Text style={styles.iconText}>Trapper Form</Text>
          </View>
          <View style={styles.navBtn}>
            <IconButton
              icon="folder"
              mode="contained"
              iconColor="white"
              containerColor="#1976D2"
              size={45}
              style={styles.iconStyle}
              onPress={() => console.log("Pressed")}
            />
            <Text style={styles.iconText}>View Cases</Text>
          </View>
        </View>
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.boxHeading}>Medication</Text>
        <Text style={styles.boxSubHeading}>Total lives saved: 8</Text>
        <View style={styles.navBox}>
          <View style={styles.navBtn}>
            <IconButton
              icon="folder"
              mode="contained"
              iconColor="white"
              containerColor="#1976D2"
              size={45}
              style={styles.iconStyle}
              onPress={() => console.log("Pressed")}
            />
            <Text style={styles.iconText}>Trapper Form</Text>
          </View>
          <View style={styles.navBtn}>
            <IconButton
              icon="folder"
              mode="contained"
              iconColor="white"
              containerColor="#1976D2"
              size={45}
              style={styles.iconStyle}
              onPress={() => console.log("Pressed")}
            />
            <Text style={styles.iconText}>View Cases</Text>
          </View>
        </View>
      </View>
      <PopUpModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#e1eefb",
  },
  appBar: {
    backgroundColor: "#1976D2",
    width: "100%",
  },
  boxContainer: {
    marginTop: 15,
    width: "90%",
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 18,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 10,
    elevation: 1.5,
    backgroundColor: "white",
  },
  boxHeading: {
    fontSize: 25,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  boxSubHeading: {
    textAlign: "right",
    paddingRight: 5,
  },
  iconStyle: {
    borderRadius: 10,
  },
  iconText: {
    fontSize: 15,
    width: 60,
    textAlign: "center",
    fontWeight: "700",
  },
  navBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  navBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
