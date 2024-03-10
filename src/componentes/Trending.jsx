import { useState, useEffect } from "react";
import axios from "axios";
import CardMovie from "./CardMovie";
import { FunctionGenres } from "../utils/funtionGenres";

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.VITE_APY_KEY;

  const dataTrending = async () => {
    try {
      const options = {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey} `,
        },
      };

      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?language=en-US`,
        options
      );
      setMovies(response.data.results);
    } catch (error) {}
  };

  useEffect(() => {
    dataTrending();
  }, []);

  return (
    <FunctionGenres>
      {(genres) => (
        <div className="container mt-5 col-ms-2">
          <div className="row">
            {movies.map((movie) => (
              <div className="col-md-4" key={movie.id}>
                <CardMovie
                  id={movie.id}
                  title={movie.title}
                  name={movie.name}
                  description={movie.overview}
                  image={movie.backdrop_path}                
                  release_date={movie.release_date}
                  first_air_date={movie.first_air_date}
                  original_language={movie.original_language}
                  popularity={movie.vote_average}
                  genres={movie.genre_ids.map((genreId) => {
                    const foundGenre = genres.find(
                      (genre) => genre.id === genreId
                    );
                    return foundGenre ? foundGenre.name : "Unknown Genre";
                  })} // Pasa los géneros como prop
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </FunctionGenres>
  );
};

export default Trending;
