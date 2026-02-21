import { createContext, useContext, useState } from "react";

const NameContext = createContext();

export const NameProvider = ({ children }) => {
  const [name, setName] = useState('');

  const setNameValue = (userName) => {
    setName(userName);
  };

  return (
    <NameContext.Provider value={{ name, setNameValue }}>
      {children}
    </NameContext.Provider>
  );
};

export const useName = () => useContext(NameContext);