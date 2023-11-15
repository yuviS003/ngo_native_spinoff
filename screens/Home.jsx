import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
} from "react-native";
import { IconButton } from "react-native-paper";
import PopUpModal from "../components/PopUpModal";
import Swiper from "react-native-swiper";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const Home = ({ navigation }) => {
  const {
    state,
    fetchDogStrlData,
    getAllStatusList,
    getAllNgoList,
    getAllAreaList,
    getAllColorList,
  } = useAppContext();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAllStatusList();
    getAllNgoList();
    getAllAreaList();
    getAllColorList();
    fetchDogStrlData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              marginHorizontal: 25,
              marginBottom: 25,
              height: 250,
              marginTop: 20,
            }}
          >
            <Swiper
              style={styles.wrapper}
              showsButtons
              autoplayTimeout={2}
              autoplay
              loop
            >
              <Image
                source={require("../assets/slider_1.jpg")}
                alt="Image not loaded"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Image
                source={require("../assets/slider_2.jpg")}
                alt="Image not loaded"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Image
                source={require("../assets/slider_3.jpg")}
                alt="Image not loaded"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Swiper>
          </View>
          <View style={styles.boxContainer}>
            <Text style={styles.boxHeading}>Sterilization</Text>
            <Text style={styles.boxSubHeading}>
              Total lives saved: {state.dogStrlCases.length}
            </Text>
            <View style={styles.navBox}>
              <View style={styles.navBtn}>
                <IconButton
                  icon="folder-plus-outline"
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
                <Text style={styles.iconText}>Trapper{"\n"}Form</Text>
              </View>
              <View style={styles.navBtn}>
                <IconButton
                  icon="view-agenda-outline"
                  mode="contained"
                  iconColor="white"
                  containerColor="#1976D2"
                  size={45}
                  style={styles.iconStyle}
                  onPress={() => {
                    console.log("Pressed");
                    navigation.navigate("viewDogStrl");
                  }}
                />
                <Text style={styles.iconText}>View{"\n"}Cases</Text>
              </View>
              {/* <View style={styles.navBtn}>
                <IconButton
                  icon="network-strength-off"
                  mode="contained"
                  iconColor="white"
                  containerColor="#1976D2"
                  size={45}
                  style={styles.iconStyle}
                  onPress={() => console.log("Pressed")}
                />
                <Text style={styles.iconText}>Offline{"\n"}Capture</Text>
              </View> */}
            </View>
          </View>
          {/* <View style={styles.boxContainer}>
            <Text style={styles.boxHeading}>Medication</Text>
            <Text style={styles.boxSubHeading}>Total lives saved: 8</Text>
            <View style={styles.navBox}>
              <View style={styles.navBtn}>
                <IconButton
                  icon="medical-bag"
                  mode="contained"
                  iconColor="white"
                  containerColor="#1976D2"
                  size={45}
                  style={styles.iconStyle}
                  onPress={() => console.log("Pressed")}
                />
                <Text style={styles.iconText}>Medication{"\n"}Form</Text>
              </View>
              <View style={styles.navBtn}>
                <IconButton
                  icon="pill"
                  mode="contained"
                  iconColor="white"
                  containerColor="#1976D2"
                  size={45}
                  style={styles.iconStyle}
                  onPress={() => console.log("Pressed")}
                />
                <Text style={styles.iconText}>Prescriptions</Text>
              </View>
              <View style={styles.navBtn}>
                <IconButton
                  icon="chart-tree"
                  mode="contained"
                  iconColor="white"
                  containerColor="#1976D2"
                  size={45}
                  style={styles.iconStyle}
                  onPress={() => console.log("Pressed")}
                />
                <Text style={styles.iconText}>Diagnosis</Text>
              </View>
            </View>
          </View> */}
        </View>
      </ScrollView>

      <PopUpModal
        visible={modalVisible}
        setVisible={setModalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
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
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  boxContainer: {
    marginTop: 25,
    marginBottom: 25,
    width: "85%",
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 10,
    elevation: 8,
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
    fontStyle: "italic",
    fontWeight: "400",
  },
  iconStyle: {
    borderRadius: 10,
  },
  iconText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "700",
  },
  navBox: {
    flexDirection: "row",
    flexWrap: "wrap",
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
