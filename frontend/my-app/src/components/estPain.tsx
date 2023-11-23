import axios from "axios";
import React, { useState } from "react";
import NavBarComponent from "./navBarComponent";
import BarChart from "./barGraph";

function estDor() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dataInicio, setDataInicio] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dataFinal, setDataFinal] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dados, setDados] = useState([]);

  const handleEstMedicine = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    let response: any;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    response = await axios.get(
      // eslint-disable-next-line no-template-curly-in-string
      `http://localhost:3000/estDor/${dataInicio}/${dataFinal}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data);

    setDados(response.data);
  };

  return (
    <>
      <NavBarComponent />
      <div className="mt-3 container">
        <div className="row">
          <h2>Estatísticas de Dores Sentidas</h2>
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

export default estDor;
