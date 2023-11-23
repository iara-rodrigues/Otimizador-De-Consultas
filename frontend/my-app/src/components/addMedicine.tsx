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
import ListGroup from "react-bootstrap/esm/ListGroup";
import NavBarComponent from "./navBarComponent";

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

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/remedios");
      const data = await response.json();
      setDados(data);
    } catch (error) {
      console.error("Erro ao obter os dados:", error);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
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
    fetchData();
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
    fetchData();
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
    fetchData();
  };

  return (
    <>
      <NavBarComponent />
      <div className="mt-3 container">
        <div className="row">
          <h2>Cadastrar Remédio</h2>
        </div>

        <form className="form-inline">
          <div className="form-group mt-2 mb-1">
            <label htmlFor="staticEmail2" className="sr-only">
              Nome
            </label>
            <input
              type="text"
              name="name"
              placeholder="Nome do Remédio"
              required
              onChange={(event) => setName(event.target.value)}
              className="form-control bg-light"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={(event) => {
              handleAddMedicine(event);
              setShow(true);
            }}
          >
            Cadastrar Remédio
          </button>
        </form>

        <div className="container p-0 mb-3">
          <div className="row g-3">
            {dados
              .slice()
              .reverse()
              .map((remedios) => (
                <div key={remedios._id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h6 className="card-title mt-2">{remedios.name}</h6>{" "}
                        <div className="d-flex justify-content-end">
                          {/* <button
                            className="btn btn-outline-primary me-2"
                            onClick={() => handleEditar(remedios._id)}
                          >
                            <FontAwesomeIcon icon={faEdit} className="me-1" />
                            Editar
                          </button> */}
                          <button
                            className="btn btn-outline-danger me-0"
                            onClick={() => handleExcluir(remedios._id)}
                          >
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              className="me-1"
                            />
                            Apagar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default addMedicine;
function fetchData() {
  throw new Error("Function not implemented.");
}
