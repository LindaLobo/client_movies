import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import imageDefault from "../assets/img/imagen_pelicula.avif";

const CardMovie = ({
  id,
  title,
  description,
  image,
  name,
  genres,
  release_date,
  original_language,
  first_air_date,
  popularity,
}) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/movie/${id}`, {
      state: {
        id,
        title,
        description,
        image,
        name,
        genres,
        release_date,
        original_language,
        first_air_date,
        popularity,
      },
    });
  };

  return (
    <Card
      style={{ width: "18rem" }}
      className="shadow p-3 mb-5 bg-body-tertiary rounded"
    >
      <Card.Img
        variant="top"
        className="bg-secondary bg-opacity-10 border"
        height={200}
        src={
          image === null
            ? imageDefault
            : `https://image.tmdb.org/t/p/original${image}`
        }
        alt="imagen pelicula"
      />
      <Card.Body className="text-center text-secondary">
        <Card.Title> {title} </Card.Title>
        <Card.Title> {name} </Card.Title>
        {/* <Card.Text>{description}</Card.Text> */}
        <Button onClick={handleDetail} className="btn-color">
          Ver Detalle
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardMovie;
