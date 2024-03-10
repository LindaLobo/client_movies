import React, { createContext, useState } from "react";

// Crear el contexto
const OptionContext = createContext();

// Crear el componente de proveedor
const OptionContextProvider = ({ children }) => {
  // Estado para almacenar el valor actual del contexto
  const [contextValue, setContextValue] = useState("movie");

  // Función para cambiar el valor del contexto
  const toggleContextValue = (value) => {
    setContextValue(value);
  };

  return (
    <OptionContext.Provider value={{ contextValue, toggleContextValue }}>
      {children}
    </OptionContext.Provider>
  );
};

export { OptionContext, OptionContextProvider };
