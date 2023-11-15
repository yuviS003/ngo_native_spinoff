import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppContext } from "../../../context/AppContext";
import { useEffect } from "react";
import { useState } from "react";
import { Image } from "react-native";
import { Button, Dialog, MD2Colors, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { bluePrHEX } from "../../../constants";
import * as Location from "expo-location";
import { getCurrentDate } from "../../../utils";
import { showMessage } from "react-native-flash-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://covalenttechnology.co.in/test";

const filterStatusNames = ["deworming", "neutering", "assigned", "admitted"];

const filterObjectsByStatusNames = (data, filterStatusNames) => {
  if (!data) return;

  return data.filter((obj) => !filterStatusNames.includes(obj.StatusName));
};

const DogStrlStatusChange = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [statusList, setStatusList] = useState(
    filterObjectsByStatusNames(state.statusList, filterStatusNames)
  );
  const [currentCase, setCurrentCase] = useState(state.strlCase);
  const [newStatus, setNewStatus] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [succDiagVisible, setSuccDiagVisible] = useState(false);
  const [distanceErrDiag, setDistanceErrDiag] = useState(false);
  const [distanceErrMsg, setDistanceErrMsg] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("permission status--> ", status);
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({});
      console.log("location--> ", location);
      setCurrentLocation(location.coords);
    } catch (error) {
      console.error("Error getting location: " + error.message);
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (userInfo?.role.includes("ViewTrapper")) {
      setNewStatus(statusList.filter((s) => s.StatusName === "released")[0].id);
    }

    if (!state.photo) {
      console.log("photo not found");
      showMessage({
        message: "Image not found",
        description: "Please capture a release image",
        type: "danger",
      });
      return;
    }

    if (!newStatus.length) {
      console.log("status not selected");
      showMessage({
        message: "Status not selected",
        description: "Please select a new status",
        type: "danger",
      });
      return;
    }

    if (!currentLocation) {
      console.log("location not captured");
      showMessage({
        message: "Location not found!",
        description:
          "Unable to capture location. Please check whether location is on and try again.",
        type: "danger",
      });
      getLocation();
      return;
    }

    const payload = {
      StatusId: newStatus,
      ReleaseLocation: {
        lat: currentLocation.latitude,
        long: currentLocation.longitude,
      },
      Remark: remarks,
      ReleaseDate: getCurrentDate(),
      ReleaseImg: "data:image/png;base64," + state.photo,
    };

    console.log("payload", payload);
    console.log(userInfo);
    setLoading(true);
    axios
      .put(`${API_BASE_URL}/transaction/update/${currentCase.id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setSuccDiagVisible(true);
        // setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 409) {
          console.log(error.response.data.message);
          setDistanceErrMsg(error.response.data.message);
          setDistanceErrDiag(true);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    const handleUserInfo = async () => {
      const temp = JSON.parse(await AsyncStorage.getItem("ngoUserInfo"));
      setUserInfo(temp);
      console.log("context state ", currentCase);
      dispatch({ type: "UPDATE_PHOTO", payload: null });
      getLocation();
    };
    handleUserInfo();
  }, []);

  return (
    <ScrollView>
      <View style={{ paddingHorizontal: 35, paddingVertical: 15, gap: 15 }}>
        <Text style={{ fontSize: 25, fontWeight: "800" }}>
          Changing Status of
        </Text>
        <View style={{ gap: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "800" }}>File Number:</Text>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {currentCase.FILENO}
          </Text>
        </View>
        <View style={{ gap: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "800" }}>
            Current Status:
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              textTransform: "uppercase",
            }}
          >
            {currentCase.StatusName}
          </Text>
        </View>
        <View style={styles.imgContainer}>
          {state.photo ? (
            <Image
              style={{ flex: 1, objectFit: "scale-down" }}
              source={{ uri: "data:image/jpg;base64," + state.photo }}
              alt="no-image"
            />
          ) : (
            <View style={styles.imgPlaceholder}>
              <Text>No Image</Text>
            </View>
          )}
        </View>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => {
            navigation.navigate("Camera");
          }}
          uppercase
          labelStyle={{ fontSize: 20 }}
          style={{
            marginTop: 0,
            borderRadius: 5,
            // backgroundColor: "#3457D5",
            backgroundColor: MD2Colors.yellow600,
          }}
        >
          capture
        </Button>
        {userInfo?.role.includes("ViewAdmin") && (
          <View>
            <Text style={styles.inpLabels}>Select New Status</Text>
            <Picker
              selectedValue={newStatus}
              onValueChange={(itemValue, itemIndex) => {
                if (itemValue.length) {
                  setNewStatus(itemValue);
                }
              }}
              mode="dialog"
            >
              <Picker.Item
                label="Tap to see all Status"
                value=""
                style={{ fontSize: 18, textTransform: "uppercase" }}
              />
              {statusList
                .filter((s) => s.StatusName !== currentCase.StatusName)
                .map((status, i) => (
                  <Picker.Item
                    label={status.StatusName.toUpperCase()}
                    value={status.id}
                    key={i}
                    style={{ fontSize: 18, textTransform: "uppercase" }}
                  />
                ))}
            </Picker>
          </View>
        )}

        <TextInput
          label="Remarks (Optional)"
          placeholder="Enter any comments"
          multiline
          numberOfLines={5}
          value={remarks}
          onChangeText={(text) => setRemarks(text)}
          style={{ backgroundColor: "#cce4fd", marginBottom: 10 }}
        />
        <Button
          mode="contained"
          style={{
            borderRadius: 5,
            backgroundColor: userInfo?.role.includes("ViewAdmin")
              ? bluePrHEX
              : MD2Colors.green700,
          }}
          labelStyle={{ fontSize: 20 }}
          onPress={handleSubmit}
          disabled={loading}
          loading={loading}
        >
          {userInfo?.role.includes("ViewAdmin") ? "CHANGE STATUS" : "RELEASE"}
        </Button>
      </View>
      <Dialog
        visible={succDiagVisible}
        onDismiss={() => {
          setSuccDiagVisible(false);
        }}
        style={{ backgroundColor: "white" }}
      >
        <Dialog.Title>Case Released Successfully!</Dialog.Title>
        <Dialog.Content>
          <Text style={{ fontSize: 18, fontWeight: "400", marginTop: 10 }}>
            Case Release has been successful.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained"
            style={{
              backgroundColor: MD2Colors.blue600,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
            labelStyle={{ fontSize: 16 }}
            onPress={() => {
              navigation.navigate("viewDogStrl");
              setSuccDiagVisible(false);
              dispatch({ type: "UPDATE_PHOTO", payload: null });
            }}
          >
            Back to View
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog
        visible={distanceErrDiag}
        onDismiss={() => {
          setDistanceErrDiag(false);
        }}
        style={{ backgroundColor: "white" }}
      >
        <Dialog.Title
          adjustsFontSizeToFit={true}
          style={{ color: MD2Colors.red600 }}
        >
          Case is not released at right location
        </Dialog.Title>
        <Dialog.Content>
          <Text style={{ fontSize: 18, fontWeight: "400", marginTop: 10 }}>
            {distanceErrMsg}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained"
            style={{
              backgroundColor: MD2Colors.blue600,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
            labelStyle={{ fontSize: 16 }}
            onPress={() => {
              setDistanceErrDiag(false);
            }}
          >
            Back
          </Button>
        </Dialog.Actions>
      </Dialog>
    </ScrollView>
  );
};

export default DogStrlStatusChange;

const styles = StyleSheet.create({
  imgContainer: {
    width: "80%",
    marginLeft: 35,
    height: 400,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 4,
    marginBottom: 10,
  },
  imgPlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
