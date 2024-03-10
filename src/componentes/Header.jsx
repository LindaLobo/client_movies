import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { OptionContext } from "../context/OptionContext";
import { useContext, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { contextValue, toggleContextValue } = useContext(OptionContext);
  const navigate = useNavigate();

  const handleChange = (value) => {
    toggleContextValue(value);
  };

  const { auth, setAuth } = useAuth();

  const sesions = () => {
    if (auth.auth == true) {
      setAuth(false);
      sessionStorage.removeItem("token", "");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <Navbar data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">
          <i className="fa-solid fa-video"></i>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {window.location.pathname === "/" && (
            <>
              <Nav.Link onClick={() => handleChange("movie")}>
                Peliculas
              </Nav.Link>
              <Nav.Link onClick={() => handleChange("tv")}>Series</Nav.Link>
            </>
          )}

          <Nav.Link href="/trending">Tendencias</Nav.Link>
        </Nav>
        <Nav className="ms-md-auto">
          <Nav.Link className="sesions" onClick={sesions}>
            {auth.auth ? "Cerrar Sesión" : "Iniciar Sesión"}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
