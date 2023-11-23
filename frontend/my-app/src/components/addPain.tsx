import axios from "axios";
//import { stringify } from "querystring";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
//import ListGroup from "react-bootstrap/esm/ListGroup";
import NavBarComponent from "./navBarComponent";

interface GetDores {
  _id: number;
  name: string;
}

// function addPain(props: any) {
function AddPain() {
  const [name, setName] = useState("");
  // const [dados, setDados] = useState<GetDores[]>([]);

  // const [tipo, setTipo] = useState("");
  const [dorS, setDoresS] = useState<any[]>([]);
  // const [id, setId] = useState("");
  //setTipo("novo");

  //TENTATIVA DE EDITAR DADOS
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [dor, setDor] = useState(dorAtual());

  // function dorAtual() {
  //   if (props.dados.data._id !== 0) {
  //     return props.dados.data;
  //   } else {
  //     return dorInicial;
  //   }
  // }

  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   if (props.dados.data._id !== 0) setDor(props.dados.data);
  // }, [props.dados.data]);

  const handleAddPain = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    console.log("click", name);

    // try {
    let response: any = {};

    response.propertyName = await axios.post(
      "http://localhost:3000/dor",
      JSON.stringify({ name }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    fetchDores();
    // } catch (error) {
    //   if (!(error instanceof Error) || !error.response) {
    //     setError("Erro ao acessar servidor");
    //   } else if (error.response.status === 400) {
    //     setError(`Nome do medicamento já existe`);
    //   }
    // }
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/dores");
  //     const data = await response.json();
  //     setDados(data);
  //   } catch (error) {
  //     console.error("Erro ao obter os dados:", error);
  //   }
  // };

  const fetchDores = async () => {
    try {
      const response = await fetch("http://localhost:3000/dores");
      const dores = await response.json();
      setDoresS(dores);
    } catch (error) {
      console.error("Erro ao obter os dados:", error);
    }
  };

  useEffect(() => {
    //fetchData();
    fetchDores();
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // Simulando dados de exemplo
    const qtdRemedios: GetDores[] = Array.from({ length: 5 }, (_, index) => ({
      _id: index + 1,
      name: `GetRemedios ${index + 1}`,
    }));
    // setDados(qtdRemedios);
    setDoresS(qtdRemedios);
  }, []);

  // const containerStyle: React.CSSProperties = {
  //   marginTop: dados.length > 7 ? "50px" : "0", // Adiciona a margem somente se houver mais de 10 dados
  // };

  // const handleCancelar = (e: MouseEvent) => {
  //   e.preventDefault();
  //   //setDor(dorInicial)
  // };

  // useEffect(() => {
  //   fetch("http://localhost:3000/dores")
  //     .then((response) => response.json())
  //     .then((data) => setDoresS(data))
  //     .catch((err) => console.log(err));
  // }, []);

  // const novosDados = async () => {
  //   setTipo("novo");
  // };

  // const limparDados = async () => {
  //   setId("");
  //   setName("");
  //   setTipo("");
  // };

  // const handleEditar = async (cod: number) => {
  //   let dor = dorS.find((item) => item._id === cod);
  //   const { _id, name } = dor;
  //   setTipo("editar");
  //   setId(_id);
  //   setName(name);
  //   //fetchDores();
  // };

  // const atualizaListaDorEditada = async (response: any) => {
  //   let { id, name } = await response.data;
  //   const index = await dorS.findIndex((item) => item._id === id);
  //   let dores = (await dorS) || {};
  //   dores[index].name = await name;
  //   setDoresS(dores);
  //   fetchDores();
  //   //limparDados();
  // };

  // const atualizaListaComNovaDor = async (response: any) => {
  //   let { id, name } = response.data;
  //   let obj = { _id: id, name: name };
  //   let pain = dorS;
  //   pain.push(obj);
  //   setDoresS(pain);
  //   limparDados();
  // };

  // const gravaDores = async () => {
  //   if (name !== "") {
  //     // if (tipo === "novo") {
  //     // try {
  //     //   const response = axios.post(
  //     //     "http://localhost:3000/dor",
  //     //     JSON.stringify({ name }),
  //     //     {
  //     //       headers: { "Content-Type": "application/json" },
  //     //     }
  //     //   );
  //     //   atualizaListaComNovaDor(response);
  //     //   fetchDores();
  //     // } catch (error) {
  //     //   console.error(error);
  //     // }
  //     // } else
  //     if (tipo === "editar") {
  //       // try {
  //       await axios
  //         .patch(`http://localhost:3000/updateDor/${id}`, {
  //           _id: id,
  //           name: name,
  //         })
  //         .then((response) => atualizaListaDorEditada(response))
  //         //.then(() => fetchDores())
  //         .catch((err) => console.log(err));
  //       // fetchDores();
  //       // } catch (error) {
  //       //   console.error(error);
  //       // }
  //     }
  //     //fetchData();
  //   } else {
  //     console.log("Preencha os campos");
  //   }
  // };

  const handleExcluir = async (_id: number) => {
    try {
      // Substitua pela sua rota de exclusão (DELETE)
      await fetch(`http://localhost:3000/deleteDor/${_id}`, {
        method: "DELETE",
      });
      console.log(`Item com ID ${_id} excluído com sucesso!`);
    } catch (error) {
      console.error("Erro ao excluir o item:", error);
    }
    fetchDores();
    setDoresS(dorS.filter((item) => item._id !== _id));
  };

  // const dores = dados.map((dado) => dado._id);
  // console.log("dores:", dores);

  return (
    <>
      <NavBarComponent />
      {/* setTipo("novo"); */}
      <div className="mt-3 container">
        <div className="row">
          {/* <Link to="/" className="add-pain-form-back">
              {" "}
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link> */}
          <h2>Cadastrar Dor</h2>
        </div>
        <form className="form-inline">
          {/* {tipo === "novo" || tipo === "editar" ? ( */}
          <div className="form-group mt-2 mb-1">
            <label htmlFor="staticEmail2" className="sr-only">
              Nome
            </label>
            <input
              type="text"
              name="name"
              placeholder="Dor que está sentindo"
              required
              onChange={(event) => setName(event.target.value)}
              className="form-control bg-light"
            />
          </div>
          {/* ) : (
            false
          )} */}

          {/* {tipo === "novo" ? ( */}
          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={(event) => {
              handleAddPain(event);
              //setShow(true);
            }}
          >
            Cadastrar Dor
          </button>
          {/* ) : (
            false
          )}
          {tipo === "editar" ? (
          <>
          <button
            className="btn btn-primary me-2 mb-2"
            type="button"
            onClick={gravaDores}
          >
            Salvar
          </button>
          <button
            type="button"
            className="btn btn-warning mb-1"
            onClick={limparDados}
          >
            Cancelar
          </button> */}
          {/* </>
          ) : (
            false
          )} */}
        </form>

        {/* {tipo === "" || tipo === "editar" ? (
        <button
          type="button"
          className="btn btn-primary mb-2"
          onClick={novosDados}
        >
          Adicionar Novo
        </button>
        ) : (
          false
        )}  */}

        {/* </div> */}
        {/* ))} */}
        <div className="container p-0 mb-3">
          {/*setTipo("editar"); */}
          <div className="row g-3">
            {dorS
              .slice()
              .reverse()
              .map((dores) => (
                <div key={dores._id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h6 className="card-title mt-2">{dores.name}</h6>{" "}
                        <div className="d-flex justify-content-end">
                          {/* <button
                            type="button"
                            className="btn btn-outline-primary me-2"
                            // onClick={() => handleEditar(dores._id)}
                            onClick={() => handleEditar(dores._id)}
                          >
                            <FontAwesomeIcon icon={faEdit} className="me-1" />
                            Editar
                          </button> */}
                          <button
                            type="button"
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

export default AddPain;
