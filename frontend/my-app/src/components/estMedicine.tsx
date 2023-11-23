import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBarComponent from "./navBarComponent";
import BarChart from "./barGraph";

function EstMedicine() {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [dados, setDados] = useState([]);

  const fetchRegisterDores = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/estRemedio/${dataInicio}/${dataFinal}`
      );
      const registers = await response.json();
      setDados(registers);
    } catch (error) {
      console.error("Erro ao obter os dados:", error);
    }
  };

  useEffect(() => {
    //fetchData();
    fetchRegisterDores();
  }, [setDados]);

  const handleEstMedicine = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    let response: any;
    response = await axios.get(
      `http://localhost:3000/estRemedio/${dataInicio}/${dataFinal}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data);

    setDados(response.data);
    fetchRegisterDores();
  };

  return (
    <>
      <NavBarComponent />
      <div className="mt-3 container">
        <div className="row">
          <h2>Estatísticas de Uso de Remédio</h2>
        </div>

        <form className="form-row">
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
        </form>
        <div className="mt-5">
          <BarChart objetos={dados} />
        </div>
      </div>
    </>
  );
}

export default EstMedicine;
