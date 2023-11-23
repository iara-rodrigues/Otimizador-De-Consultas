import axios from "axios";
//import { stringify } from "querystring";
import React, { useEffect, useState } from "react";

function addUser() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [surname, setSurname] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError] = useState("");

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

    //try {
    let response: any;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    response = await axios.post(
      "http://localhost:3000/user",
      JSON.stringify({ name, surname, email, password }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // } catch (error) {
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   if (!error?.response) {
    //     setError("Erro ao acessar servidor");
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   } else if (error.response.status == 400) {
    //     setError(`Nome do medicamento já existe`);
    //   }
    // }
  };

  return (
    <div className="register-medicine-form-wrap">
      <h2>Registrar Usuário</h2>
      <form className="register-medicine-form">
        {/* <label className="add-medicine-form-label">Nome</label> */}

        <input
          type="text"
          name="name"
          placeholder="Nome"
          required
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          name="surname"
          placeholder="Sobrenome"
          required
          onChange={(event) => setSurname(event.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          onChange={(event) => setPassword(event.target.value)}
        />

        <button
          type="submit"
          className="btn-register-medicine"
          onClick={(event) => handleAddUser(event)}
        >
          Cadastrar Usuário
        </button>
      </form>
      <p>{error}</p>
    </div>
  );
}

export default addUser;
