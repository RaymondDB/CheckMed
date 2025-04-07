import React, { useState } from "react";
import "./css/Login.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUserContext } from "../auth/userContext";

function Login() {
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [user, setUser] = useUserContext();

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/Home";
    navigate(path);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/login", { usernameLog, passwordLog })
      .then((response) => {
        const token = response.data.token;
        document.cookie = `token=${token}; max-age=${
          7200 * 2
        }; path="/"; samesite=strict`;
        setUser(response.data.results[0]);
        Swal.fire({
          icon: "success",
          title: "Bienvenid@",
        }).then(routeChange);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Credenciales incorrectas",
        }).then(() => {
          setPasswordLog("");
          setUsernameLog("");
        });
      });
  };

  return (
    <div className="Login">
      <div className="center">
        <div className="container">
          <div className="text">Iniciar Sesión</div>
          <form onSubmit={handleSubmit}>
            <div className="data">
              <label>Nombre de usuario</label>
              <input
                type="text"
                required
                autoComplete="off"
                onChange={(e) => {
                  setUsernameLog(e.target.value);
                }}
              />
            </div>
            <div className="data">
              <label>Contraseña</label>
              <input
                type="password"
                required
                onChange={(e) => {
                  setPasswordLog(e.target.value);
                }}
              />
            </div>
            <div className="btn">
              <div className="inner"></div>
              <button type="submit">Ingresar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
