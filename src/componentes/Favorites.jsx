import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import Card from "react-bootstrap/Card";
import imageDefault from "../assets/img/imagen_pelicula.avif";

const Favorites = () => {
  const location = useLocation();
  const { state } = location;
  const { auth } = useAuth();
  const [favorites, setFavorites] = useState([]);

  const handleFavorites = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/favorites", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      // Filtramos las películas favoritas para eliminar duplicados
      const uniqueFavorites = response.data.filter(
        (movie, index, self) =>
          index === self.findIndex((e) => e.item_id === movie.item_id)
      );
      setFavorites(uniqueFavorites);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFavorites();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center text-secondary">Tus películas favoritas:</h2>
      <div className="row">
        {favorites.map((movie, index) => (
          <div className="col-md-6" key={index}>
            <Card key={movie.id}>
              <Card.Img
                variant="top"
                src={
                  movie.image === null
                    ? imageDefault
                    : `https://image.tmdb.org/t/p/original${movie.image}`
                }
                alt="imagen pelicula"
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Title>{movie.name}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
