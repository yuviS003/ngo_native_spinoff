import React, { createContext, useReducer, useContext } from "react";

// Create a context
const AppContext = createContext();

// Initial state for your context
const initialState = {
  photo: null, // Initialize photo as null
};

// Define your reducer function to update the state
const appReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PHOTO":
      return { ...state, photo: action.payload }; // Update the photo variable
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
