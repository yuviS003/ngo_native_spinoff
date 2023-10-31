import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Image } from "react-native";
import { Button, RadioButton, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import { bluePrHEX } from "../../constants";

const DogStrlForm = ({
  currentStep,
  navigation,
  statusList,
  colorList,
  ngoList,
  areaList,
  formData,
  setFormData,
}) => {
  const [recordingGPS, setRecordingGPS] = useState(false);
  const { state, dispatch } = useAppContext(); // Access the context and state

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocationOnButtonPress = async () => {
    setRecordingGPS(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("permission status--> ", status);
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({});
      console.log("location--> ", location);
      setFormData({
        ...formData,
        TrapLocation: {
          lat: location.coords.latitude,
          long: location.coords.longitude,
        },
      });
      setLocation(location);
      setRecordingGPS(false);
    } catch (error) {
      setErrorMsg("Error getting location: " + error.message);
      setRecordingGPS(false);
    }
  };

  return (
    <View style={styles.container}>
      {currentStep === 1 && (
        <View>
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
              marginTop: 15,
              borderRadius: 5,
              backgroundColor: "#3457D5",
            }}
          >
            capture
          </Button>
        </View>
      )}
      {currentStep === 2 && (
        <>
          <View style={{ gap: 10 }}>
            {errorMsg ? (
              <Text style={{ ...styles.inpLabels, color: "red" }}>
                {errorMsg}
              </Text>
            ) : location ? (
              <Text style={styles.inpLabels}>
                ✅ Location Recorded Successfully!
              </Text>
            ) : (
              <Text style={styles.inpLabels}>
                Press the button to get location
              </Text>
            )}
            <Button
              loading={recordingGPS}
              disabled={recordingGPS}
              onPress={getLocationOnButtonPress}
              mode="contained-tonal"
              style={{
                borderRadius: 5,
                backgroundColor: "#cce4fd",
              }}
              labelStyle={{ fontSize: 18, color: bluePrHEX }}
              icon="map-marker-circle"
            >
              Record Location
            </Button>
          </View>

          <View>
            <Text style={styles.inpLabels}>Choose Gender</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="male"
                status={formData.gender === "male" ? "checked" : "unchecked"}
                onPress={() => setFormData({ ...formData, gender: "male" })}
                color="blue"
              />
              <Text style={{ fontSize: 18 }}>Male</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="female"
                status={formData.gender === "female" ? "checked" : "unchecked"}
                onPress={() => setFormData({ ...formData, gender: "female" })}
                color="blue"
              />
              <Text style={{ fontSize: 18 }}>Female</Text>
            </View>
          </View>

          <View>
            <Text style={styles.inpLabels}>Choose Colors</Text>
            <Picker
              selectedValue={formData.Color}
              onValueChange={(itemValue, itemIndex) => {
                setFormData({
                  ...formData,
                  Color: itemValue,
                });
              }}
            >
              {colorList.map((color, i) => (
                <Picker.Item
                  label={color.ColorName}
                  value={color.id}
                  key={i}
                  style={{ fontSize: 18 }}
                />
              ))}
            </Picker>
          </View>

          <View>
            <Text style={styles.inpLabels}>Choose NGO</Text>
            <Picker
              selectedValue={formData.NgoId}
              onValueChange={(itemValue, itemIndex) => {
                setFormData({
                  ...formData,
                  NgoId: itemValue,
                });
              }}
              style={{}}
            >
              {ngoList.map((ngo, i) => (
                <Picker.Item
                  label={ngo.NgoName}
                  value={ngo.id}
                  key={i}
                  style={{ fontSize: 18 }}
                />
              ))}
            </Picker>
          </View>
        </>
      )}
      {currentStep === 3 && (
        <>
          <View>
            <Text style={styles.inpLabels}>Choose Area</Text>
            <Picker
              selectedValue={formData.AreaId}
              onValueChange={(itemValue, itemIndex) => {
                setFormData({
                  ...formData,
                  AreaId: itemValue,
                });
              }}
              style={{}}
            >
              {areaList.map((area, i) => (
                <Picker.Item
                  label={area.AreaName}
                  value={area.id}
                  key={i}
                  style={{ fontSize: 18 }}
                />
              ))}
            </Picker>
          </View>
          <Text style={styles.inpLabels}>Enter any Area Landmark:</Text>
          <TextInput
            label="Area Landmark"
            multiline
            numberOfLines={5}
            value={formData.Landmark}
            onChangeText={(text) =>
              setFormData({
                ...formData,
                Landmark: text,
              })
            }
            style={{ backgroundColor: "#cce4fd" }}
          />
          <Text style={styles.inpLabels}>Enter any remarks(optional)</Text>
          <TextInput
            label="Comments"
            multiline
            numberOfLines={5}
            value={formData.Comment}
            onChangeText={(text) =>
              setFormData({
                ...formData,
                Comment: text,
              })
            }
            style={{ backgroundColor: "#cce4fd" }}
          />
        </>
      )}
      {currentStep === 4 && (
        <>
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
          <View style={styles.revLabInpBox}>
            <Text style={styles.revLabel}>Location:</Text>
            <Text style={styles.revInp}>Recorded</Text>
          </View>
          <View style={styles.revLabInpBox}>
            <Text style={styles.revLabel}>Gender:</Text>
            <Text style={styles.revInp}>{formData.gender}</Text>
          </View>
          <View style={styles.revLabInpBox}>
            <Text style={styles.revLabel}>Colors:</Text>
            <Text style={styles.revInp}>{formData.ColorName}</Text>
          </View>
          <View style={styles.revLabInpBox}>
            <Text style={styles.revLabel}>NGO:</Text>
            <Text style={styles.revInp}>
              {
                ngoList.filter((area) => area.NgoId === formData.NgoId)[0]
                  ?.NgoName
              }
            </Text>
          </View>
          <View style={styles.revLabInpBox}>
            <Text style={styles.revLabel}>Area:</Text>
            <Text style={styles.revInp}>
              {
                areaList.filter((area) => area.AreaId === formData.AreaId)[0]
                  ?.AreaName
              }
            </Text>
          </View>
          <View style={styles.revLabInpBox}>
            <Text style={styles.revLabel}>Area Landmark:</Text>
            <Text style={styles.revInp}>{formData.Landmark}</Text>
          </View>
          <View style={styles.revLabInpBox}>
            <Text style={styles.revLabel}>Comments:</Text>
            <Text style={styles.revInp}>{formData.Comment}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default DogStrlForm;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    flex: 1,
    gap: 20,
  },
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
  inpLabels: {
    fontSize: 18,
    fontWeight: "800",
  },
  revLabInpBox: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  revLabel: {
    fontSize: 20,
    fontWeight: "800",
  },
  revInp: {
    fontSize: 20,
  },
});
