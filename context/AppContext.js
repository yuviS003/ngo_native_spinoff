import React, { createContext, useReducer, useContext } from "react";

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

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
