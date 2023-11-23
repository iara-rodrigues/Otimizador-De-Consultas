import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
//import { stringify } from "querystring";
import React, { useEffect, useState } from "react";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import NavBarComponent from "./navBarComponent";

interface GetRemedios {
  _id: number;
  name: string;
}

interface GetRegisterRemedios {
  _id: number;
  name: string;
  dose: string;
  motivo: string;
  data: Date;
  indica: boolean;
}

function registerMedicine() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dose, setDose] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [motivo, setMotivo] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setDate] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [indicacao, setIndicacao] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dadosRegister, setDadosRegister] = useState<GetRegisterRemedios[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dadosRem, setDadosRem] = useState<GetRemedios[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/registrosRemedio");
      const data = await response.json();
      setDadosRegister(data);
    } catch (error) {
      console.error("Erro ao obter os dados:", error);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
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

  const handleIndicacaoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target;
    setIndicacao(checked);
  };

  const handleEditar = (_id: number) => {
    // Implemente a lógica de edição aqui
    console.log(`Editar item com ID: ${_id}`);
    fetchData();
  };

  const handleExcluir = async (_id: number) => {
    try {
      // Substitua pela sua rota de exclusão (DELETE)
      await fetch(`http://localhost:3000/deleteRegistroRemedio/${_id}`, {
        method: "DELETE",
      });
      console.log(`Item com ID ${_id} excluído com sucesso!`);
    } catch (error) {
      console.error("Erro ao excluir o item:", error);
    }
    fetchData();
  };

  const handleRegisterMedicine = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();
    console.log("click", name, dose, motivo, data, indicacao);

    //try {
    let response: any;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    response = await axios.post(
      "http://localhost:3000/registrarRemedio",
      JSON.stringify({ name, dose, motivo, data, indicacao }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    fetchData();
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/remedios");
        const data = await response.json();
        setDadosRem(data);
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
          <h2>Registrar Uso de Remédio</h2>
        </div>

        <form className="form-row">
          <div className="form-group d-flex justify-content-between mt-2">
            <div className="form-group col-md-6  me-1">
              <label>Nome do Remédio tomado</label>
              <select
                className="form-control bg-light"
                name="name"
                required
                onChange={(event) => setName(event.target.value)}
              >
                <option selected>Selecione um Remédio</option>
                {dadosRem.map((remedios) => (
                  <option key={remedios.name} value={remedios.name}>
                    {remedios.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-6">
              <label>Dose tomada do Remédio</label>
              <input
                type="text"
                className="form-control bg-light"
                name="dose"
                placeholder="Dose"
                required
                onChange={(event) => setDose(event.target.value)}
              />
            </div>
          </div>
          <div className="form-group d-flex justify-content-between mt-3">
            <div className="form-group col-md-6 me-1">
              <label>Motivo de ter do Remédio</label>
              <input
                type="text"
                className="form-control bg-light"
                name="motivo"
                placeholder="Motivo"
                onChange={(event) => setMotivo(event.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Dia que tomou o Remédio</label>
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
          <div className="form-group mt-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
                name="indicacao"
                placeholder="Foi indicação Médica? Se sim - Marque o campo abaixo."
                required
                onChange={handleIndicacaoChange}
              />
              <label className="form-check-label">
                {" "}
                Marque se foi indicação Médica
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary mb-2 mt-3"
            onClick={(event) => handleRegisterMedicine(event)}
          >
            Registrar Uso de Remédio
          </button>
        </form>

        <div className="container p-0 mb-3">
          <div className="row g-3">
            {dadosRegister
              .slice()
              .reverse()
              .map((remedios) => (
                <div key={remedios._id} className="col-lg-6 col-xg-4 col-md-12">
                  <div className="card h-100">
                    {/* <div className="card-body p-lg-5 p-md-2"> */}
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        {remedios.motivo != "" ? (
                          <h6 className="card-title pt-4">
                            Nome: {remedios.name}, Dose: {remedios.dose}, Data:{" "}
                            {format(new Date(remedios.data), "dd/MM/yyyy")},
                            Motivo: {remedios.motivo}
                          </h6>
                        ) : (
                          <h6 className="card-title pt-4">
                            Nome: {remedios.name}, Dose: {remedios.dose}, Data:{" "}
                            {format(new Date(remedios.data), "dd/MM/yyyy")}
                          </h6>
                        )}

                        {/* <h6 className="card-title mt-2">
                      Nome: {remedios.name}, Dose: {remedios.dose}, Data:{" "}
                      {format(new Date(remedios.data), "dd/MM/yyyy")}
                    </h6>
                    {remedios.motivo != null ? (
                      <h6 className="card-title mt-2">
                        , Motivo: {remedios.motivo}
                      </h6>
                    ) : null}
                    {remedios.indica == true ? (
                      <h6 className="card-title mt-2">, Foi Indicação!</h6>
                    ) : (
                      <h6 className="card-title mt-2">, Não foi Indicação.</h6>
                    )} */}

                        <div className="d-flex justify-content-end p-3">
                          <button
                            className="btn btn-outline-primary me-2"
                            //onClick={() => handleEditar(remedios._id)}
                          >
                            <FontAwesomeIcon icon={faEdit} className="me-1" />
                            Editar
                          </button>
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

export default registerMedicine;
