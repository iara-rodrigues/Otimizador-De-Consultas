import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBarComponent from "./navBarComponent";
import BarChart from "./barGraph";

function EstDor() {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [dados, setDados] = useState([]);
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
    const fetchRegisterDores = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/estDor/${idUser}/${dataInicio}/${dataFinal}`
        );
        const registers = await response.json();
        setDados(registers);
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };
    //fetchRegisterDores();
  }, [idUser, dataInicio, dataFinal, setDados]);

  const handleEstMedicine = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      let response: any;
      response = await axios.get(
        `http://localhost:3000/estDor/${idUser}/${dataInicio}/${dataFinal}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);

      setDados(response.data);
    } catch (error) {
      window.alert(
        "Ocorreu um erro ao obter dados. Por favor, tente novamente."
      );
    }
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
          <h2>Estatísticas de Dores Sentidas</h2>
        </div>

        <form className="form-row">
          {tipo === "novo" ? (
            <>
              <div className="form-group d-flex justify-content-between mt-3">
                <div className="form-group col-md-6">
                  <label>Data Início para gerar a estatística</label>
                  <input
                    type="date"
                    className="form-control bg-light"
                    name="dataInicio"
                    placeholder="Data"
                    required
                    onChange={(event) => setDataInicio(event.target.value)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Data Final</label>
                  <input
                    type="date"
                    className="form-control bg-light"
                    name="dataFinal"
                    placeholder="Data"
                    required
                    onChange={(event) => setDataFinal(event.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary mb-2 mt-3"
                onClick={(event) => handleEstMedicine(event)}
              >
                Gerar Estatísticas
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
        <div className="mt-5">
          <BarChart objetos={dados} />
        </div>
      </div>
    </>
  );
}

export default EstDor;
