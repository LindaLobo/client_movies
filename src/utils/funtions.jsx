import axios from "axios";
const apiKey = import.meta.env.VITE_APY_KEY;

export const getData = async (contextValue, page = 1) => {
  try {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/${contextValue}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
      options
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener la data:", error);
  }
};

export const searchMovie = async (movie, page) => {
  try {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=${page}`,
      options
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener la data:", error);
  }
};
