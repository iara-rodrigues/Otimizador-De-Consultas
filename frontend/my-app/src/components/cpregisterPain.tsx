import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
//import { stringify } from "querystring";
import React, { useEffect, useState } from "react";
//import ListGroup from "react-bootstrap/esm/ListGroup";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import NavBarComponent from "./navBarComponent";

interface GetDor {
  _id: number;
  name: string;
}

interface GetRegisterDores {
  _id: number;
  name: string;
  desc: string;
  data: Date;
}

function RegisterPain() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [data, setDate] = useState("");
  const [dadosRegister, setDadosRegister] = useState<GetRegisterDores[]>([]);

  const [dadosEdit, setDadosEdit] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/registrosDor");
      const data = await response.json();
      setDadosRegister(data);
    } catch (error) {
      console.error("Erro ao obter os dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function getRegister() {
    try {
      const response = await axios.get("http://localhost:3000/dores");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(getRegister());

  //COMEÇA A PARTE DA EDIÇÃO
  const fetchRegisterDores = async () => {
    try {
      const response = await fetch("http://localhost:3000/registrosDor");
      const registers = await response.json();
      setDadosEdit(registers);
    } catch (error) {
      console.error("Erro ao obter os dados:", error);
    }
  };

  useEffect(() => {
    //fetchData();
    fetchRegisterDores();
  }, []);

  const handleEditar = (_id: number) => {
    // Implemente a lógica de edição aqui
    console.log(`Editar item com ID: ${_id}`);
    fetchData();
  };

  const handleExcluir = async (_id: number) => {
    try {
      // Substitua pela sua rota de exclusão (DELETE)
      await fetch(`http://localhost:3000/deleteRegistroDor/${_id}`, {
        method: "DELETE",
      });
      console.log(`Item com ID ${_id} excluído com sucesso!`);
    } catch (error) {
      console.error("Erro ao excluir o item:", error);
    }
    fetchData();
  };

  const handleRegisterPain = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    console.log("click", name, desc, data);

    //try {
    let response: any;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    response = await axios.post(
      "http://localhost:3000/registrarDor",
      JSON.stringify({ name, desc, data }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    fetchData();
  };

  const [dados, setDados] = useState<GetDor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/dores");
        const data = await response.json();
        setDados(data);
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBarComponent />
      <div className="mt-3 container">
        <div className="row">
          <h2>Registrar Ocorrência de Dor</h2>
        </div>

        <form className="form-row">
          <div className="form-group d-flex justify-content-between mt-2">
            <div className="form-group col-md-6 me-1">
              <label>Nome do Dor sentida</label>
              <select
                className="form-control bg-light"
                name="name"
                required
                onChange={(event) => setName(event.target.value)}
              >
                <option selected>Selecione uma Dor</option>
                {dados.map((dores) => (
                  <option key={dores.name} value={dores.name}>
                    {dores.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-6 me-2">
              <label>Descrição da Dor sentida</label>
              <input
                type="text"
                className="form-control bg-light"
                name="descricao"
                placeholder="Descrição"
                onChange={(event) => setDesc(event.target.value)}
              />
            </div>
          </div>
          <div className="form-group mt-3">
            <div className="form-group col-md-6 me-2">
              <label>Dia que sentiu a Dor</label>
              <input
                type="date"
                className="form-control bg-light"
                name="date"
                placeholder="Data"
                required
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary mb-2 mt-3"
            onClick={(event) => handleRegisterPain(event)}
          >
            Registrar Ocorrência de Dor
          </button>
        </form>

        <div className="container p-0 mb-3">
          <div className="row g-2">
            {dadosRegister
              .slice()
              .reverse()
              .map((dores) => (
                <div key={dores._id} className="col-lg-6 col-md-12">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        {dores.desc == "" ? (
                          <h6 className="card-title pt-4">
                            Nome: {dores.name}, Data:{" "}
                            {format(new Date(dores.data), "dd/MM/yyyy")}
                          </h6>
                        ) : (
                          <h6 className="card-title pt-4">
                            Nome: {dores.name}, Descrição: {dores.desc}, Data:{" "}
                            {format(new Date(dores.data), "dd/MM/yyyy")}
                          </h6>
                        )}
                        <div className="d-flex justify-content-end">
                          <button
                            className="btn btn-outline-primary me-2"
                            //onClick={() => handleEditar(remedios._id)}
                          >
                            <FontAwesomeIcon icon={faEdit} className="me-1" />
                            Editar
                          </button>
                          <button
                            className="btn btn-outline-danger me-0"
                            onClick={() => handleExcluir(dores._id)}
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

export default RegisterPain;
