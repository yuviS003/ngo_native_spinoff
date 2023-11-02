import { Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Button, List, MD2Colors } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../../components/Loaders/Loader";
import { ScrollView } from "react-native";
import { bluePrHEX } from "../../../constants";
import { useAppContext } from "../../../context/AppContext";
import { useFocusEffect } from "@react-navigation/native";

const API_BASE_URL = "https://covalenttechnology.co.in/test";

const DogView = ({ navigation }) => {
  const { state, dispatch } = useAppContext();
  const [dogStrlCases, setDogStrlCases] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchDogStrlData = async () => {
    setLoader(true);
    const userInfo = await AsyncStorage.getItem("ngoUserInfo");
    axios
      .get(`${API_BASE_URL}/transaction/`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(userInfo).token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("then", response.data[0]);
        console.log("then", response.data[0]?.TrapImg);
        console.log(
          "then",
          API_BASE_URL + "/image/" + response.data[0]?.TrapImg
        );
        setDogStrlCases(response.data);
        setLoader(false);
      })
      .catch((error) => {
        console.error("catch", error.response);
        setLoader(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchDogStrlData();
    }, [])
  );

  return (
    <ScrollView>
      {loader ? (
        <Loader />
      ) : (
        <View style={{ padding: 15 }}>
          <List.AccordionGroup>
            {dogStrlCases.map((dCase, i) => (
              <List.Accordion
                left={(props) => (
                  <View
                    {...props}
                    style={{
                      width: 50,
                      height: 50,
                      marginLeft: 5,
                      backgroundColor: "black",
                      borderRadius: 25,
                    }}
                  >
                    <Image
                      style={{
                        objectFit: "scale-down",
                        width: 50,
                      }}
                      source={{
                        uri: `${API_BASE_URL}/image/${dCase.TrapImg}`,
                      }}
                      alt="no-image"
                    />
                  </View>
                )}
                titleStyle={{ fontSize: 17 }}
                style={{ borderColor: "gray", borderWidth: 0.2 }}
                title={dCase.FILENO}
                id={i}
                key={i}
              >
                <View style={styles.accBody}>
                  <View
                    style={{
                      backgroundColor: "black",
                      width: 200,
                      height: 300,
                      marginLeft: 50,
                    }}
                  ></View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 40,
                      textTransform: "uppercase",
                      fontWeight: "500",
                      color: MD2Colors.green600,
                    }}
                  >
                    {dCase.StatusName}
                  </Text>
                  <Text
                    style={{
                      ...styles.accBodySecText,
                      fontSize: 17,
                      fontWeight: "700",
                    }}
                  >
                    {dCase.FILENO}
                  </Text>
                  <View style={styles.accBodySec}>
                    <Text style={styles.accBodySecText}>{dCase.TrapDate}</Text>
                    <Text style={styles.accBodySecText}>{dCase.username}</Text>
                  </View>
                  <View style={styles.accBodySec}>
                    <Text style={styles.accBodySecText}>{dCase.NgoName}</Text>
                    <Text style={styles.accBodySecText}>{dCase.AreaName}</Text>
                  </View>
                  <View style={styles.accBodySec}>
                    <Text style={styles.accBodySecText}>{dCase.ColorName}</Text>
                    <Text style={styles.accBodySecText}>{dCase.gender}</Text>
                  </View>
                  <View
                    style={{
                      ...styles.accBodySec,
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text style={styles.accBodySecText}>Landmark: </Text>
                    <Text style={styles.accBodySecText}>{dCase.Landmark}</Text>
                  </View>
                  <View
                    style={{
                      ...styles.accBodySec,
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text style={styles.accBodySecText}>Comments: </Text>
                    <Text style={styles.accBodySecText}>{dCase.Comment}</Text>
                  </View>
                  <Button
                    mode="contained"
                    style={{
                      width: "100%",
                      padding: 8,
                      borderRadius: 5,
                      backgroundColor: bluePrHEX,
                    }}
                    labelStyle={{
                      color: "white",
                      fontSize: 20,
                      fontWeight: "700",
                      textTransform: "uppercase",
                    }}
                    onPress={() => {
                      dispatch({
                        type: "UPDATE_STRL_CASE",
                        payload: dCase,
                      });

                      navigation.navigate("changeStatusDogStrl");
                    }}
                  >
                    Change Status
                  </Button>
                </View>
              </List.Accordion>
            ))}
          </List.AccordionGroup>
        </View>
      )}
    </ScrollView>
  );
};

export default DogView;

const styles = StyleSheet.create({
  accBody: {
    borderColor: "gray",
    borderWidth: 0.2,
    paddingRight: 50,
    gap: 20,
    paddingVertical: 30,
  },
  accBodySec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accBodySecText: {
    fontSize: 16,
  },
});
