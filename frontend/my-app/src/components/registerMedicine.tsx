import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import NavBarComponent from "./navBarComponent";

interface GetRemedios {
  _id: number;
  name: string;
  user: string;
}

function RegisterMedicine() {
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [motivo, setMotivo] = useState("");
  const [data, setDate] = useState("");
  const [indicacao, setIndicacao] = useState(false);
  //const [dadosRegister, setDadosRegister] = useState<any[]>([]);
  const [dadosRem, setDadosRem] = useState<GetRemedios[]>([]);

  const [tipo, setTipo] = useState("");
  const [dadosEdit, setDadosEdit] = useState<any[]>([]);
  const [id, setId] = useState("");

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
          `http://localhost:3000/registrosRemedio/${idUser}`
        );
        const registers = await response.json();
        //setDadosRegister(registers);
        setDadosEdit(registers);
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };
    fetchData();
  }, [setDadosEdit, idUser]);

  async function getRegister() {
    try {
      const response = await axios.get(
        `http://localhost:3000/remedios/${idUser}`
      );
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

  //COMEÇA A PARTE DA EDIÇÃO
  const fetchRegisterMedicines = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/registrosRemedio/${idUser}`
      );
      const registers = await response.json();
      setDadosEdit(registers);
    } catch (error) {
      console.error("Erro ao obter os dados:", error);
    }
  };

  const novosDados = async () => {
    await getId();
    setTipo("novo");
    limparDados(1);
  };

  const limparDados = async (x: number) => {
    setId("");
    setName("");
    setDate("");
    setMotivo("");
    setDose("");
    if (x === 0) setTipo("");
  };

  const handleEditar = async (cod: number) => {
    let dor = dadosEdit.find((item) => item._id === cod);
    const { _id, name, data, motivo, dose } = dor;
    setTipo("editar");
    setId(_id);
    setName(name);
    setDate(data);
    setMotivo(motivo);
    setDose(dose);
  };

  const atualizaListaRegistroEditada = async (response: any) => {
    let { name, data, motivo, dose } = await response.data;
    const index = await dadosEdit.findIndex((item) => item._id === id);
    let register = (await dadosEdit) || {};
    register[index].name = await name;
    register[index].data = await data;
    register[index].motivo = await motivo;
    register[index].dose = await dose;
    setDadosEdit(register);
  };

  const gravaDores = async () => {
    //if (name !== "" && data !== "" && dose !== "") {
    if (tipo === "editar") {
      // try {
      await axios
        .patch(`http://localhost:3000/updateRegistroRemedio/${id}`, {
          _id: id,
          name: name,
          data: data,
          motivo: motivo,
          dose: dose,
        })
        .then((response) => {
          atualizaListaRegistroEditada(response);
          fetchRegisterMedicines();
        })
        //.then(() => fetchDores())
        .catch((err) => [
          window.alert(
            "Ocorreu um erro ao editar os dados. Por favor, tente novamente."
          ),
          console.log(err),
        ]);
    }
  };

  const handleExcluir = async (_id: number) => {
    try {
      // Substitua pela sua rota de exclusão (DELETE)
      await fetch(`http://localhost:3000/deleteRegistroRemedio/${_id}`, {
        method: "DELETE",
      });
      console.log(`Item com ID ${_id} excluído com sucesso!`);
    } catch (error) {
      window.alert("Ocorreu um erro ao excluir. Por favor, tente novamente.");
      console.error("Erro ao excluir o item:", error);
    }
    //fetchData();
    fetchRegisterMedicines();
  };

  const handleRegisterMedicine = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();
    console.log("click", name, dose, motivo, data, indicacao);

    try {
      await axios.post(
        `http://localhost:3000/registrarRemedio/${idUser}`,
        JSON.stringify({ name, dose, motivo, data, indicacao }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      window.alert(
        "Ocorreu um erro ao salvar dados. Por favor, tente novamente."
      );
      console.log(error);
    }

    fetchRegisterMedicines();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/remedios/${idUser}`
        );
        const data = await response.json();
        setDadosRem(data);
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };

    fetchData();
  }, [idUser]);

  return (
    <>
      <NavBarComponent />
      <div className="mt-3 container">
        <div className="row">
          <h2>Registrar Uso de Remédio</h2>
        </div>

        <form className="form-row">
          {tipo === "novo" || tipo === "editar" ? (
            <>
              <div className="form-group d-flex justify-content-between mt-2">
                <div className="form-group col-md-6  me-1">
                  <label>Nome do Remédio tomado</label>
                  <select
                    className="form-control bg-light"
                    name="name"
                    value={name}
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
                    value={dose}
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
                    value={motivo}
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
                    value={data}
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
            </>
          ) : (
            false
          )}
          {tipo === "novo" ? (
            <button
              type="submit"
              className="btn btn-primary mb-2 mt-3"
              onClick={(event) => handleRegisterMedicine(event)}
            >
              Registrar Uso de Remédio
            </button>
          ) : (
            false
          )}

          {tipo === "editar" ? (
            <>
              <button
                className="btn btn-success mt-2 me-2 mb-2"
                type="button"
                onClick={gravaDores}
              >
                Salvar
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => limparDados(0)}
              >
                Cancelar
              </button>
            </>
          ) : (
            false
          )}
        </form>

        {tipo === "" || tipo === "editar" ? (
          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={novosDados}
          >
            Adicionar Novo
          </button>
        ) : (
          false
        )}

        <div className="container p-0 mb-3">
          <div className="row g-3">
            {dadosEdit
              .slice()
              .reverse()
              .map((remedios) => (
                <div key={remedios._id} className="col-lg-6 col-xg-4 col-md-12">
                  <div className="card h-100">
                    {/* <div className="card-body p-lg-5 p-md-2"> */}
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        {remedios.motivo !== "" ? (
                          <h6 className="card-title pt-4">
                            Nome: {remedios.name}, Dose: {remedios.dose}, Data:
                            {remedios.data
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("/")}
                            , Motivo: {remedios.motivo}
                          </h6>
                        ) : (
                          <h6 className="card-title pt-4">
                            Nome: {remedios.name}, Dose: {remedios.dose}, Data:
                            {remedios.data
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("/")}
                          </h6>
                        )}

                        <div className="d-flex justify-content-end p-3">
                          <button
                            className="btn btn-outline-primary me-2"
                            onClick={() => handleEditar(remedios._id)}
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

export default RegisterMedicine;
