import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { OptionContext } from "../context/OptionContext";

export const FunctionGenres = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const { contextValue } = useContext(OptionContext);

  const apiKey = import.meta.env.VITE_APY_KEY;

  const dataGenres = async (generoId) => {
    try {
      const options = {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      };

      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/${generoId}/list?language=en`,
        options
      );
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Error al obtener la data:", error);
    }
  };

  useEffect(() => {
    dataGenres(contextValue); // Pasar 'contextValue' como argumento
  }, [contextValue]); // Agregar 'contextValue' como dependencia

  return <>{children(genres)}</>;
};
