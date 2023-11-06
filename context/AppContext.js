import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useReducer, useContext } from "react";
import { showMessage } from "react-native-flash-message";
import { sortArrayByUpdatedAt } from "../utils";

const API_BASE_URL = "https://covalenttechnology.co.in/test";

// Create a context
const AppContext = createContext();

// Initial state for your context
const initialState = {
  photo: null, // Initialize photo as null
  strlCase: null,
  statusList: null,
  colorList: null,
  ngoList: null,
  areaList: null,
  dogStrlCases: [],
};

// Define your reducer function to update the state
const appReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PHOTO":
      return { ...state, photo: action.payload }; // Update the photo variable
    case "UPDATE_STRL_CASE":
      return { ...state, strlCase: action.payload };
    case "UPDATE_COLOR":
      return { ...state, colorList: action.payload };
    case "UPDATE_NGO":
      return { ...state, ngoList: action.payload };
    case "UPDATE_AREA":
      return { ...state, areaList: action.payload };
    case "UPDATE_STATUS":
      return { ...state, statusList: action.payload };
    case "UPDATE_DOG_STRL_CASES":
      return { ...state, dogStrlCases: action.payload };
    default:
      return state;
  }
};

// Create a custom hook to access the context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Create a context provider component
export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const fetchDogStrlData = async () => {
    const userInfo = await AsyncStorage.getItem("ngoUserInfo");
    axios
      .get(`${API_BASE_URL}/transaction/`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(userInfo).token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("context then--> ", response.data[0]);
        dispatch({
          type: "UPDATE_DOG_STRL_CASES",
          payload: sortArrayByUpdatedAt(response.data),
        });
      })
      .catch((error) => {
        console.error("context catch--> ", error.response);
      });
  };

  const getAllStatusList = () => {
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
        if (response.status === 200)
          dispatch({
            type: "UPDATE_STATUS",
            payload: response.data,
          });
      })
      .catch((error) => {
        console.error("status catch", error);
      });
  };

  const getAllNgoList = () => {
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
        if (response.status === 200)
          dispatch({
            type: "UPDATE_NGO",
            payload: response.data,
          });
      })
      .catch((error) => {
        console.error("ngo catch", error);
      });
  };

  const getAllAreaList = () => {
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
        if (response.status === 200)
          dispatch({
            type: "UPDATE_AREA",
            payload: response.data,
          });
      })
      .catch((error) => {
        console.error("area catch", error);
      });
  };

  const getAllColorList = () => {
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
        if (response.status === 200)
          dispatch({
            type: "UPDATE_COLOR",
            payload: response.data,
          });
      })
      .catch((error) => {
        console.error("color catch", error);
      });
  };

  const authenticateUser = (userDetails, password) => {
    const TOKEN = userDetails.token;
    console.log("user details in auth func--> ", userDetails);
    console.log("token--> ", TOKEN);
    axios
      .get(`${API_BASE_URL}/login`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then(async (response) => {
        console.log("then--> ", response.data);
        console.log(response.data.auth);
        const authObject = {
          userId: response.data.auth.id,
          userName: response.data.auth.username,
          email: response.data.auth.email,
          role: response.data.auth.role.split(","),
          token: TOKEN,
          pw: password,
        };
        console.log("authObject--> ", JSON.stringify(authObject));
        await AsyncStorage.setItem("ngoUserInfo", JSON.stringify(authObject));
      })
      .catch((error) => {
        console.log("catch--> ", error.message);
        console.log("catch--> ", error.response.data);
        showMessage({
          message: "ERROR",
          description: error.response.data.message.toUpperCase(),
          type: "danger",
        });
        setIsLoading(false);
      });
  };

  const loginUser = (userName, password) => {
    if (!userName.length) {
      showMessage({
        message: "USERNAME EMPTY",
        description: "Please enter your username",
        type: "danger",
      });
      return;
    }
    if (!password.length) {
      showMessage({
        message: "PASSWORD EMPTY",
        description: "Please enter your password",
        type: "danger",
      });
      return;
    }
    if (password.length < 6) {
      showMessage({
        message: "PASSWORD TOO SHORT",
        description: "Password must contain at least 6 characters",
        type: "info",
      });
      return;
    }
    if (userName.length && password.length) {
      console.log(API_BASE_URL);
      console.log(userName, password);
      const payload = {
        username: userName,
        password: password,
      };
      axios
        .post(`${API_BASE_URL}/login`, JSON.stringify(payload), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("/login then--> ", response);
          console.log("/login then--> ", response.data.data);
          authenticateUser(response.data.data, password);
        })
        .catch((error) => {
          console.error("/login catch--> ", error);
          showMessage({
            message: "ERROR",
            description: error.response.data.message.toUpperCase(),
            type: "danger",
          });
          console.error("/login catch--> ", error.response.data);
        });
    }
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        fetchDogStrlData,
        getAllStatusList,
        getAllNgoList,
        getAllAreaList,
        getAllColorList,
        loginUser,
        authenticateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
