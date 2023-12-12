import axios from "axios";
//import { stringify } from "querystring";
import React, { useState } from "react";

function AddUser() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  // const [error, setError] = useState("");

  async function getRegister() {
    try {
      const response = await axios.get("http://localhost:3000/user");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(getRegister());

  const handleAddUser = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    console.log("click", name, surname, email, password);

    try {
      let response: any;
      response = await axios.post(
        "http://localhost:3000/user",
        JSON.stringify({ name, surname, email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      window.alert("Dados salvos com sucesso.");
    } catch (error) {
      window.alert(
        "Ocorreu um erro ao salvar dados. Por favor, tente novamente."
      );
    }
  };

  return (
    <div className="mt-3 container d-flex justify-content-center">
      <div>
        <div className="row">
          <h2>Registrar Novo Usuário</h2>
        </div>

        <form className="form-row">
          <>
            <div className="form-group col-md-6 mt-1">
              <label>Nome</label>
              <input
                className="form-control bg-light"
                name="name"
                value={name}
                placeholder="Nome"
                required
                onChange={(event) => setName(event.target.value)}
              ></input>
            </div>
            <div className="form-group col-md-6 mt-1">
              <label>Sobrenome</label>
              <input
                className="form-control bg-light"
                name="surname"
                value={surname}
                placeholder="Subrenome"
                required
                onChange={(event) => setSurname(event.target.value)}
              ></input>
            </div>
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
              />
            </div>
            <div className="form-group col-md-6 mt-1">
              <label>Senha</label>
              <input
                type="password"
                className="form-control bg-light"
                name="password"
                value={password}
                placeholder="Senha"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group col-md-6 mt-1">
              <label>Confirmar Senha</label>
              <input
                type="password"
                className="form-control bg-light"
                name="passwordConfirmed"
                value={passwordConfirmed}
                placeholder="Confirmar Senha"
                required
                onChange={(event) => setPasswordConfirmed(event.target.value)}
              />
            </div>
          </>

          {password === passwordConfirmed && password !== "" ? (
            <button
              type="submit"
              className="btn btn-primary mb-2 mt-3"
              onClick={(event) => handleAddUser(event)}
            >
              Registrar Usuário
            </button>
          ) : (
            <div className="row mt-3">
              <p> Preencha as senhas igualmente</p>
            </div>
          )}
        </form>
      </div>
    </div>

    // /* // <div className="register-medicine-form-wrap">
    // //   <h2>Registrar Usuário</h2>
    // //   <form className="register-medicine-form">
    // //     {/* <label className="add-medicine-form-label">Nome</label> */}

    // //     <input
    // //       type="text"
    // //       name="name"
    // //       placeholder="Nome"
    // //       required
    // //       onChange={(event) => setName(event.target.value)}
    // //     />
    // //     <input
    // //       type="text"
    // //       name="surname"
    // //       placeholder="Sobrenome"
    // //       required
    // //       onChange={(event) => setSurname(event.target.value)}
    // //     />
    // //     <input
    // //       type="email"
    // //       name="email"
    // //       placeholder="Email"
    // //       onChange={(event) => setEmail(event.target.value)}
    // //     />
    // //     <input
    // //       type="password"
    // //       name="password"
    // //       placeholder="Senha"
    // //       onChange={(event) => setPassword(event.target.value)}
    // //     />

    // //     <button
    // //       type="submit"
    // //       className="btn-register-medicine"
    // //       onClick={(event) => handleAddUser(event)}
    // //     >
    // //       Cadastrar Usuário
    // //     </button>
    // //   </form>
    // //   <p>{error}</p>
    // // </div> */}
  );
}

export default AddUser;
