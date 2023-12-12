import axios from "axios";
//import { stringify } from "querystring";
import { useState } from "react";
import * as React from "react";
import { Link, Navigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogged = localStorage.getItem("token");
  //const hasToken = isLogged && new Date(localStorage.getItem("expiry")) > new Date();
  const [isLoggedIn, setIsLoggedIn] = useState(isLogged ? true : false);
  console.log("isloggged: ", isLogged, isLoggedIn);
  const handleLogin = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    //console.log("click", name, surname, email, password);
    try {
      await axios
        .post(
          "http://localhost:3000/login",
          JSON.stringify({ email, password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          console.log("token: ", res.data.token);
          //localStorage.setItem("exper")
          setIsLoggedIn(true);
        });
    } catch (error) {
      window.alert("Usuário ou senha incorretos");
      console.error(error);
    }
  };

  return !isLoggedIn ? (
    <div className="container mt-3">
      <div>
        <div className="row">
          <h2>Realizar Login</h2>
        </div>

        <form className="form-row">
          <>
            <div className="form-group col-md-6 mt-1">
              <label>Email</label>
              <input
                type="email"
                className="form-control bg-light"
                name="email"
                value={email}
                placeholder="Email"
                required
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>
            <div className="form-group col-md-6 mt-1">
              <label>Senha</label>
              <input
                type="password"
                className="form-control bg-light"
                name="password"
                value={password}
                placeholder="Senha"
                required
                onChange={(event) => setPassword(event.target.value)}
              ></input>
            </div>
          </>

          <div className="form-group col-md-6">
            <button
              type="submit"
              className="btn btn-primary mb-2 mt-3"
              onClick={(event) => handleLogin(event)}
            >
              Logar
            </button>
          </div>
          <div className="form-group col-md-6">
            <Link to="/addUser">
              <button type="button" className="btn btn-outline-primary mt-1">
                Cadastrar Usuário
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
}

export default Login;
