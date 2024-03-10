import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useLocation, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import imageDefault from "../assets/img/imagen_pelicula.avif";


const Detail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { state } = location; // Obtener los datos de la película de la ubicación
  const { auth } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const singUp = () => {
    navigate("/signup");
  };

  const login = () => {
    navigate("/login");
  };

  const handleFavorites = async (state) => {
    navigate("/favorites", { state });

    let save_item = {
      item_id: state.id,
      image: state.image,
      title: state.title || state.name,
      description: state.description,
      release_date: state.release_date || state.first_air_date,
      original_language: state.original_language,
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/api/save_movie",
        save_item,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setFavorites(response.data);
      Swal.fire({
        icon: "success",
        title: "Guardada con Exito",
        text: `${response.data.message}`,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    }
  };

  const opciones = () => {
    Swal.fire({
      title: "Elige una opción",
      showCancelButton: true,
      background: "#fff url(/images/trees.png)",
      backdrop: `
          rgba(0,0,123,0.4)
          url("https://i.gifer.com/TwtY.gif")
          center bottom
          no-repeat
        `,
      confirmButtonText: "Iniciar Sesión",
      cancelButtonText: "Nuevo Usuario",
      cancelButtonColor: "rgb(112, 102, 224)",
    }).then((result) => {
      if (result.isConfirmed) {
        login();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        singUp();
      }
    });
  };

  return (
    <div className="container shadow mt-5 p-3 mb-5 bg-body-tertiary rounded">
      {state && (
        <>
          <Card key={state.id}>
            <div className="row card-detalle">
              <div className="d-flex justify-content-center align-items-center">
                <h1 className="text-center mt-2 text-secondary">
                  {state.title.toUpperCase()}
                </h1>
              </div>

              <div className="col-md-6">
                <Card.Img
                  variant="top"
                  src={ state.image === null ? imageDefault :
                    `https://image.tmdb.org/t/p/original${state.image}`}
                  alt="imagen pelicula"
                />
              </div>
              <div className="col-md-6">
                <Card.Body className="">
                  <Card.Text className="text-justify">
                    {state.description}
                  </Card.Text>
                  <div>
                    <strong>Genero:</strong>{" "}
                    {state.genres.map((genre) => genre.name).join(", ")}
                  </div>
                  <Card.Text className="mt-3">
                    <strong>LIKES:</strong> {state.popularity}
                    <i className="fa-regular fa-thumbs-up"></i>
                  </Card.Text>
                  <div className="row">
                    <div className="col-md-6">
                      {auth.auth ? ( // Verifica si el usuario está autenticado
                        <Button
                          className="btn-color"
                          onClick={() => handleFavorites(state)}
                        >
                          Agregar a favoritos
                        </Button>
                      ) : (
                        <Button className="btn-color" disabled>
                          Agregar a favoritos
                        </Button> // Deshabilita el botón si el usuario no está autenticado
                      )}
                    </div>
                    <div className="col-md-6">
                      <Button className="btn-color" onClick={opciones}>
                        REGISTRATE{" "}
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default Detail;
