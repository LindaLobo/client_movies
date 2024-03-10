import React from "react";
import CardMovie from "./CardMovie";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect, useContext } from "react";
import ReactPaginate from "react-paginate";
import { OptionContext } from "../context/OptionContext";
import { getData, searchMovie } from "../utils/funtions";
import { FunctionGenres } from "../utils/funtionGenres";
import imagenDefault from "../assets/img/imagen_pelicula.avif";
import Swal from "sweetalert2";

const Grilla = () => {
  const [movies, setMovies] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const { contextValue } = useContext(OptionContext);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const dataMovie = async (page = 1) => {
    try {
      let response = await getData(contextValue, page);
      setMovies(response.results);
      setPageCount(response.total_pages);
    } catch (error) {
      console.error("Error al obtener la data:", error);
    }
  };

  const handleSearch = async (page = 1) => {
    try {
      const response = await searchMovie(search, page);
      setMovies(response.results);
      setPageCount(response.total_pages);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Intentalo de nuevo o comunicate con el administrador!`,
      });
    }
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    let page = pageNumber === 0 ? selectedPage + 1 : selectedPage;
    search === "" ? dataMovie(page) : handleSearch(page);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    dataMovie();
  }, [contextValue]);

  const clearSearchResults = () => {
    setSearchResults([]);
  };

  return (
    <FunctionGenres>
      {(genres) => (
        <div className="container mt-5 col-ms-2">
          <div className="row">
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                className="btn-color"
                type="submit"
                value="Submit"
                disabled={search === ""}
              >
                Search
              </Button>
            </Form>
            {movies && movies.length > 0 ? (
              movies.map((movie) => (
                <div className="col-md-4 mt-5" key={movie.id}>
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
                    genres={movie.genre_ids.map((genreId) =>
                      genres.find((genre) => genre.id === genreId)
                    )}
                  />
                </div>
              ))
            ) : (
              <div className="shadow p-3 mb-5 mt-5 bg-body-tertiary rounded text-center ">
                <h1 className="text-center text-secondary ">
                  No se encontraron peliculas en esta busqueda
                </h1>
                <img src={imagenDefault} />
              </div>
            )}
          </div>
          {movies.length > 0 && (
            <div
              style={{ display: "flex", justifyContent: "center" }}
              className="mb-5"
            >
              <ReactPaginate
                breakLabel="..."
                nextLabel="Siguiente >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< Anterior"
                renderOnZeroPageCount={null}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
                forcePage={pageNumber}
              />
            </div>
          )}
        </div>
      )}
    </FunctionGenres>
  );
};

export default Grilla;
