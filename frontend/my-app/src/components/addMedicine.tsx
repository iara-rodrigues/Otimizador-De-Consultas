import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import NavBarComponent from "./navBarComponent";

function AddMedicine() {
  const [name, setName] = useState("");
  //const [dados, setDados] = useState<GetRemedios[]>([]);
  const [dados, setDados] = useState<any[]>([]);
  const [tipo, setTipo] = useState("");

  const [idUser, setIdUser] = useState("");

  const getId = async () => {
    try {
      const response = await axios.get("http://localhost:3000/profile", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const user = response.data;
      setIdUser(user._id);
    } catch (error) {
      console.error("Erro ao obter os dados:", error);
    }
  };

  useEffect(() => {
    console.log("user getId: ", idUser);
  }, [idUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/remedios/${idUser}`
        );
        const registers = await response.json();
        setDados(registers);
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };
    fetchData();
  }, [setDados, idUser]);

  const handleExcluir = async (_id: number) => {
    try {
      // Substitua pela sua rota de exclusão (DELETE)
      await fetch(`http://localhost:3000/deleteRemedio/${_id}`, {
        method: "DELETE",
      });
      console.log(`Item com ID ${_id} excluído com sucesso!`);
    } catch (error) {
      window.alert(
        "Ocorreu um erro ao excluir dados. Por favor, tente novamente."
      );
      console.error("Erro ao excluir o item:", error);
    }
    getR();
  };

  const getR = async () => {
    try {
      await getId();
      const response = await axios.get(
        `http://localhost:3000/remedios/${idUser}`
      );
      const dores = await response.data;
      setDados(dores);
    } catch (error) {
      window.alert(
        "Ocorreu um erro ao obter dados. Por favor, tente novamente."
      );
      console.error("Erro ao obter os dados:", error);
    }
  };

  const handleAddMedicine = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      await axios.post(
        `http://localhost:3000/remedio/${idUser}`,
        JSON.stringify({ name }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      window.alert(
        "Ocorreu um erro ao salvar dados. Por favor, tente novamente."
      );
    }
    getR();
  };

  const novosDados = async () => {
    await getId();
    setTipo("novo");
  };

  return (
    <>
      <NavBarComponent />
      <div className="mt-3 container">
        <div className="row">
          <h2>Cadastrar Remédio</h2>
        </div>

        <form className="form-inline">
          {tipo === "novo" ? (
            <>
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
                }}
              >
                Cadastrar Remédio
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-primary mb-2"
              onClick={novosDados}
            >
              Adicionar Novo
            </button>
          )}
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

export default AddMedicine;
