import axios from "axios";
import { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const hadleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });
      const token = response.data.message;
      sessionStorage.setItem("token", token);
      setAuth({ token, auth: true });
      navigate("/");
    } catch (error) {
      console.log("se genero un error", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data}!`,
      });
    }
  };

  return (
    <div className="container mt-5 shadow p-3 mb-5 bg-body-tertiary rounded">
      <h1 className="text-center text-secondary mb-5">Iniciar sesión</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            id="input_email"
            placeholder="Email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Form.Label>Email</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            id="input_password"
            placeholder="Password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Form.Label>Password</Form.Label>
        </Form.Group>
        <div className="text-center">
          <Button
            type="button"
            className="btn btn-color btn-block mb-4"
            onClick={hadleLogin}
          >
            Iniciar Sesion
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
