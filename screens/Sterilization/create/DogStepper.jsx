import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import DogStrlForm from "../../../components/FormBoxes/DogStrlForm";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "../../../context/AppContext";
import { Button, Dialog, MD2Colors } from "react-native-paper";
import { bluePrHEX } from "../../../constants";
import {
  getAreaNameById,
  getColorNameById,
  getCurrentDate,
  getNgoNameById,
  getStatusNameById,
} from "../../../utils";
import { showMessage } from "react-native-flash-message";

const API_BASE_URL = "https://covalenttechnology.co.in/test";

const steps = [1, 2, 3, 4];

const DogStepper = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const { state, dispatch } = useAppContext();
  const [formData, setFormData] = useState({
    categoryName: "dog",
    gender: "",
    ReleaseImg: "",
    OtherImg: "",
    TrapLocation: null,
    ReleaseLocation: "",
    FileDate: "",
    AreaId: "",
    NgoId: "",
    Color: "",
    Comment: "",
    Landmark: "",
    StatusId: "",
    LoginId: "",
    TrapDate: "",
    TrapImg: "",
    ReleaseDate: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [succDiagVisible, setSuccDiagVisible] = useState(false);
  const [newFileNumber, setNewFileNumber] = useState("");

  const nextStep = () => {
    if (currentStep + 1 <= Math.max(...steps)) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep - 1 >= Math.min(...steps)) setCurrentStep(currentStep - 1);
  };

  const resetForm = () => {
    setFormData({
      categoryName: "dog",
      gender: "",
      ReleaseImg: "",
      OtherImg: "",
      TrapLocation: null,
      ReleaseLocation: "",
      FileDate: "",
      AreaId: "",
      NgoId: "",
      Color: "",
      Comment: "",
      Landmark: "",
      StatusId: "",
      LoginId: "",
      TrapDate: "",
      TrapImg: "",
      ReleaseDate: "",
    });
    setLoader(false);
    setSuccDiagVisible(false);
    setNewFileNumber("");
    setCurrentStep(1);
    dispatch({ type: "UPDATE_PHOTO", payload: null });
  };

  const handleSubmit = async () => {
    if (!state.photo) {
      showMessage({
        message: "TRAP IMAGE NOT FOUND",
        description: "Please capture a trap image to continue.",
        type: "warning",
      });
      return;
    }

    if (!formData.TrapLocation) {
      showMessage({
        message: "LOCATION NOT FOUND",
        description: "Unable to capture location. Please try again.",
        type: "warning",
      });
      return;
    }

    if (
      formData.AreaId === "" ||
      formData.Color === "" ||
      formData.NgoId === "" ||
      formData.gender === "" ||
      formData.Landmark === ""
    ) {
      showMessage({
        message: "IMPORTANT FIELDS EMPTY",
        description:
          "Area, Landmark, Color, NGO and Gender are compulsory. Please check.",
        type: "warning",
      });
      return;
    }

    setLoader(true);
    const userInfo = await AsyncStorage.getItem("ngoUserInfo");
    let payload = formData;
    payload = {
      ...payload,
      StatusId: state.statusList.filter((st) => st.StatusName === "trapped")[0]
        .id,
      LoginId: JSON.parse(userInfo).userId,
      TrapDate: getCurrentDate(),
      FileDate: getCurrentDate(),
      TrapImg: "data:image/png;base64," + state.photo,
    };
    setFormData(payload);
    console.log("context data", state);
    console.log(
      "color name",
      getColorNameById(state.colorList, formData.Color)
    );
    console.log("area name", getAreaNameById(state.areaList, formData.AreaId));
    console.log("ngo name", getNgoNameById(state.ngoList, formData.NgoId));
    console.log(
      "status name",
      getStatusNameById(state.statusList, formData.StatusId)
    );
    console.log("submitted data--> ", payload);
    axios
      .post(`${API_BASE_URL}/transaction/create`, JSON.stringify(payload), {
        headers: {
          Authorization: `Bearer ${JSON.parse(userInfo).token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("then", response.data);
        setNewFileNumber(response.data.data.FileNo);
        setSuccDiagVisible(true);
      })
      .catch((error) => {
        console.error("catch", error);
        setLoader(false);
        // console.log(error.response);
      });
  };

  return (
    <ScrollView>
      <Text
        style={{
          paddingVertical: 20,
          marginLeft: 40,
          paddingBottom: 10,
          fontSize: 28,
          fontWeight: "600",
          textAlignVertical: "center",
        }}
      >
        We are helping a{" "}
        <Text
          style={{
            fontSize: 30,
            color: "#E1AD01",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          Dog!
        </Text>
      </Text>
      <View style={styles.stepContainer}>
        {steps.map((step, i) => (
          <View style={{ flexDirection: "row", alignItems: "center" }} key={i}>
            <View
              style={
                currentStep === step ? styles.activeStep : styles.inactiveStep
              }
            >
              <Text style={styles.stepText}>{step}</Text>
            </View>
            {steps.slice(-1)[0] != step && <View style={styles.stepLine} />}
          </View>
        ))}
      </View>
      <View>
        <DogStrlForm
          currentStep={currentStep}
          navigation={navigation}
          formData={formData}
          setFormData={setFormData}
        />
      </View>
      <View style={styles.stepControllers}>
        <Button
          style={styles.stepContrBtn}
          labelStyle={styles.stepContrBtnText}
          onPress={prevStep}
          disabled={loader}
        >
          Previous
        </Button>
        <Button
          style={styles.stepContrBtn}
          labelStyle={styles.stepContrBtnText}
          onPress={steps.slice(-1)[0] != currentStep ? nextStep : handleSubmit}
          loading={loader}
          disabled={loader}
        >
          {steps.slice(-1)[0] != currentStep ? "Next" : "Submit"}
        </Button>
      </View>
      <Dialog
        visible={succDiagVisible}
        onDismiss={() => {
          setSuccDiagVisible(false);
        }}
        style={{ backgroundColor: "white" }}
      >
        <Dialog.Title>Cases Created Successfully</Dialog.Title>
        <Dialog.Content>
          <Text style={{ fontSize: 18, fontWeight: "400", marginTop: 10 }}>
            Hooray! A new case has been created
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 10 }}>
            New File No.: {newFileNumber}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained"
            style={{
              backgroundColor: MD2Colors.green600,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
            labelStyle={{ fontSize: 16 }}
            onPress={resetForm}
          >
            Create More
          </Button>
          <Button
            mode="contained"
            style={{
              backgroundColor: MD2Colors.blue600,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
            labelStyle={{ fontSize: 16 }}
            onPress={() => {
              navigation.navigate("Home");
              setSuccDiagVisible(false);
              dispatch({ type: "UPDATE_PHOTO", payload: null });
            }}
          >
            Back to Home
          </Button>
        </Dialog.Actions>
      </Dialog>
    </ScrollView>
  );
};

export default DogStepper;

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  activeStep: {
    borderColor: "white",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: bluePrHEX,
  },
  inactiveStep: {
    borderColor: "white",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: "grey",
  },
  stepText: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
  },
  stepLine: {
    backgroundColor: bluePrHEX,
    width: 55,
    height: 1,
  },
  stepControllers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 16,
  },
  stepContrBtn: {
    backgroundColor: bluePrHEX,
    paddingVertical: 5,
    width: "45%",
    borderRadius: 5,
  },
  stepContrBtnText: {
    color: "white",
    fontSize: 19,
    textTransform: "uppercase",
    fontWeight: "900",
    textAlign: "center",
  },
});
