import React, { createContext, useState } from "react";

// Create the context
export const CaptainDataContext = createContext();

// Create a provider component
const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({});
  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};
export default CaptainContext;
