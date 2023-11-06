import { Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Button, List, MD2Colors, Searchbar } from "react-native-paper";
import Loader from "../../../components/Loaders/Loader";
import { ScrollView } from "react-native";
import { bluePrHEX } from "../../../constants";
import { useAppContext } from "../../../context/AppContext";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect } from "react";
import { searchDogStrlCases } from "../../../utils";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const API_BASE_URL = "https://covalenttechnology.co.in/test";

const DogView = ({ navigation }) => {
  const { state, dispatch, fetchDogStrlData } = useAppContext();
  const [dogStrlCases, setDogStrlCases] = useState(state.dogStrlCases);
  const [backup_dogCases, setBackup_dogCases] = useState(state.dogStrlCases);
  const [loader, setLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useFocusEffect(
    useCallback(() => {
      setSearchQuery("");
      fetchDogStrlData();
    }, [])
  );

  useEffect(() => {
    if (searchQuery.length) {
      const temp = searchDogStrlCases(dogStrlCases, searchQuery);
      setDogStrlCases(temp);
    } else {
      setDogStrlCases(backup_dogCases);
    }
  }, [searchQuery]);

  return (
    <ScrollView>
      {loader ? (
        <Loader />
      ) : (
        <View style={{ padding: 15 }}>
          <Searchbar
            placeholder="Search"
            onChangeText={(query) => setSearchQuery(query)}
            value={searchQuery}
            elevation={2}
            style={{
              borderRadius: 5,
              marginBottom: 10,
              backgroundColor: "white",
              borderColor: MD2Colors.grey200,
              borderWidth: 1,
              fontSize: 16,
            }}
          />
          {dogStrlCases.length ? (
            <List.AccordionGroup>
              {dogStrlCases.map((dCase, i) => (
                <List.Accordion
                  left={(props) => (
                    <View
                      {...props}
                      style={{
                        width: 50,
                        height: 50,
                        marginLeft: 10,
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
                        borderColor: "black",
                        width: 200,
                        height: 300,
                        marginLeft: 50,
                        borderWidth: 1,
                      }}
                    >
                      <Image
                        style={{
                          objectFit: "scale-down",
                          width: "auto",
                        }}
                        source={{
                          uri: `${API_BASE_URL}/image/${dCase.TrapImg}`,
                        }}
                        alt="no-image"
                      />
                    </View>
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
                      <Text style={styles.accBodySecText}>
                        {dCase.TrapDate}
                      </Text>
                      <Text style={styles.accBodySecText}>
                        {dCase.username}
                      </Text>
                    </View>
                    <View style={styles.accBodySec}>
                      <Text style={styles.accBodySecText}>{dCase.NgoName}</Text>
                      <Text style={styles.accBodySecText}>
                        {dCase.AreaName}
                      </Text>
                    </View>
                    <View style={styles.accBodySec}>
                      <Text style={styles.accBodySecText}>
                        {dCase.ColorName}
                      </Text>
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
                      <Text style={styles.accBodySecText}>
                        {dCase.Landmark}
                      </Text>
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
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                gap: 15,
                alignItems: "center",
                paddingVertical: 25,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{ fontSize: 18, textAlign: "center", fontWeight: "700" }}
              >
                No Case(s) available
              </Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  fetchDogStrlData();
                  setSearchQuery("");
                }}
              >
                <Ionicons name="reload" size={30} color="blue" />
              </TouchableOpacity>
            </View>
          )}
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
