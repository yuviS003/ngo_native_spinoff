import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import DogStrlForm from "../../../components/FormBoxes/DogStrlForm";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "../../../context/AppContext";
import { Button } from "react-native-paper";
import { bluePrHEX } from "../../../constants";
import { getCurrentDate } from "../../../utils";
// import SuccessStrlCasesMsg from "../../../components/PopUps/SuccessStrlCasesMsg";

const API_BASE_URL = "https://covalenttechnology.co.in/test";

const steps = [1, 2, 3, 4];

const DogStepper = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const { state, dispatch } = useAppContext(); // Access the context and state
  const [formData, setFormData] = useState({
    categoryName: "dog",
    gender: "",
    AreaId: "",
    NgoId: "",
    ReleaseImg: "",
    OtherImg: "",
    TrapLocation: null,
    ReleaseLocation: "",
    FileDate: "",
    Color: "",
    Comment: "",
    Landmark: "",
    StatusId: "",
    LoginId: "",
    TrapDate: "",
    TrapImg: "data:image/png;base64",
    ReleaseDate: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [statusList, setStatusList] = useState([]);
  const [ngoList, setNgoList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [colorList, setColorList] = useState([]);

  const nextStep = () => {
    if (currentStep + 1 <= Math.max(...steps)) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep - 1 >= Math.min(...steps)) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setLoader(true);
    const userInfo = await AsyncStorage.getItem("ngoUserInfo");
    let payload = formData;
    payload = {
      ...payload,
      StatusId: statusList.filter((st) => st.StatusName === "trapped")[0].id,
      LoginId: JSON.parse(userInfo).userId,
      TrapDate: getCurrentDate(),
      FileDate: getCurrentDate(),
      TrapImg: "data:image/png;base64" + state.photo,
    };
    setFormData(payload);
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
        setLoader(false);
      })
      .catch((error) => {
        console.error("catch", error);
        setLoader(false);
        // console.log(error.response);
      });
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/ngo`, {
        headers: {
          // Authorization: `Bearer ${
          //   JSON.parse(localStorage.getItem("AFA_test_user"))?.token
          // }`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("ngo then", response);
        if (response.status === 200) setNgoList(response.data);
      })
      .catch((error) => {
        console.error("ngo catch", error);
      });
    axios
      .get(`${API_BASE_URL}/area`, {
        headers: {
          // Authorization: `Bearer ${
          //   JSON.parse(localStorage.getItem("AFA_test_user"))?.token
          // }`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("area then", response);
        if (response.status === 200) setAreaList(response.data);
      })
      .catch((error) => {
        console.error("area catch", error);
      });
    axios
      .get(`${API_BASE_URL}/status`, {
        headers: {
          // Authorization: `Bearer ${
          //   JSON.parse(localStorage.getItem("AFA_test_user"))?.token
          // }`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("status then", response);
        if (response.status === 200) setStatusList(response.data);
      })
      .catch((error) => {
        console.error("status catch", error);
      });
    axios
      .get(`${API_BASE_URL}/color`, {
        headers: {
          // Authorization: `Bearer ${
          //   JSON.parse(localStorage.getItem("AFA_test_user"))?.token
          // }`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("color then", response);
        if (response.status === 200) setColorList(response.data);
      })
      .catch((error) => {
        console.error("color catch", error);
      });
  }, []);

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
          statusList={statusList}
          colorList={colorList}
          ngoList={ngoList}
          areaList={areaList}
          formData={formData}
          setFormData={setFormData}
        />
      </View>
      <View style={styles.stepControllers}>
        {/* <TouchableOpacity
          style={styles.stepContrBtn}
          activeOpacity={0.6}
          onPress={prevStep}
        >
          <Text style={styles.stepContrBtnText}>Previous</Text>
        </TouchableOpacity> */}
        <Button
          style={styles.stepContrBtn}
          labelStyle={styles.stepContrBtnText}
          onPress={prevStep}
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
      {/* <SuccessStrlCasesMsg /> */}
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
