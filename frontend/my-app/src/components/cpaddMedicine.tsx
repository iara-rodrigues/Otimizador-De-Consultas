import axios, { HttpStatusCode } from "axios";
//import { stringify } from "querystring";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Modal from "./Modal";

interface GetRemedios {
  _id: number;
  name: string;
}

function addMedicine() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dados, setDados] = useState<GetRemedios[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/remedios");
        const data = await response.json();
        setDados(data);
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };

    fetchData();
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // Simulando dados de exemplo
    const qtdRemedios: GetRemedios[] = Array.from(
      { length: 5 },
      (_, index) => ({
        _id: index + 1,
        name: `GetRemedios ${index + 1}`,
      })
    );
    setDados(qtdRemedios);
  }, []);

  const containerStyle: React.CSSProperties = {
    marginTop: dados.length > 7 ? "50px" : "0", // Adiciona a margem somente se houver mais de 10 dados
  };

  const handleEditar = (_id: number) => {
    // Implemente a lógica de edição aqui
    console.log(`Editar item com ID: ${_id}`);
  };

  const handleExcluir = async (_id: number) => {
    try {
      // Substitua pela sua rota de exclusão (DELETE)
      await fetch(`http://localhost:3000/deleteRemedio/${_id}`, {
        method: "DELETE",
      });
      console.log(`Item com ID ${_id} excluído com sucesso!`);
    } catch (error) {
      console.error("Erro ao excluir o item:", error);
    }
  };

  const handleAddMedicine = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //console.log("status: ", response.status);
    //console.log("click", name);

    //try {
    let response: any;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    response = await axios.post(
      "http://localhost:3000/remedio",
      JSON.stringify({ name }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("status: ", response.status);

    // eslint-disable-next-line no-lone-blocks

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
    //<div className="add-medicine-form-wrap">
    // <div className="App">
    //   <div className="add-medicine-form-back-and-title">
    <div className="container">
      <div className="row">
        <Link to="/" className="add-medicine-form-back">
          {" "}
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h2>Cadastrar Remédio</h2>
      </div>
      <form className="add-medicine-form">
        {/* <label className="add-medicine-form-label">Nome</label> */}
        <input
          type="text"
          name="name"
          placeholder="Nome"
          required
          onChange={(event) => setName(event.target.value)}
        />
        <button
          type="submit"
          //className="btn-add-medicine"
          className="btn btn-outline-secondary"
          // onClick={(event) => {
          //   handleShowModal(200);
          //   handleAddMedicine(event);
          // }}
          onClick={(event) => {
            handleAddMedicine(event);
            setShow(true);
          }}
        >
          Cadastrar Remédio
        </button>
      </form>

      <form className="get-add-medicine-form">
        <table style={containerStyle}>
          <thead>
            <tr>
              <th>Remédios</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((remedios) => (
              <tr key={remedios._id}>
                <td>{remedios.name}</td>
                <td>
                  <button onClick={() => handleEditar(remedios._id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleExcluir(remedios._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
      <p>{error}</p>
      {/* <Modal setShow={setShow} /> */}
    </div>
  );
}

export default addMedicine;
