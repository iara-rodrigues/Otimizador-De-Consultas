import axios from "axios";
//import { stringify } from "querystring";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
//import ListGroup from "react-bootstrap/esm/ListGroup";
import NavBarComponent from "./navBarComponent";

interface GetDores {
  _id: number;
  name: string;
}

const dorInicial = {
  _id: "",
  name: "",
};

// function addPain(props: any) {
function addPain() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  //const [error, setError] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dados, setDados] = useState<GetDores[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tipo, setTipo] = useState("");

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
    fetchData();
    // } catch (error) {
    //   if (!(error instanceof Error) || !error.response) {
    //     setError("Erro ao acessar servidor");
    //   } else if (error.response.status === 400) {
    //     setError(`Nome do medicamento já existe`);
    //   }
    // }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/dores");
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
    const qtdRemedios: GetDores[] = Array.from({ length: 5 }, (_, index) => ({
      _id: index + 1,
      name: `GetRemedios ${index + 1}`,
    }));
    setDados(qtdRemedios);
  }, []);

  const containerStyle: React.CSSProperties = {
    marginTop: dados.length > 7 ? "50px" : "0", // Adiciona a margem somente se houver mais de 10 dados
  };

  // const handleCancelar = (e: MouseEvent) => {
  //   e.preventDefault();
  //   //setDor(dorInicial)
  // };

  const handleEditar = async (_id: number) => {
    // Implemente a lógica de edição aqui
    //console.log(`Editar item com ID: ${_id}`);
    // Substitua pela sua rota de exclusão (DELETE)
    // try {
    //   await fetch(`http://localhost:3000/updateDor/${_id}`, {
    //     method: "PATCH",
    //   });
    //   console.log(`Item com ID ${_id} editado com sucesso!`);
    // } catch (error) {
    //   console.error("Erro ao editar o item:", error);
    // }
    // fetchData();
  };

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
    fetchData();
  };

  return (
    <>
      <NavBarComponent />
      <div className="mt-3 container">
        <div className="row">
          {/* <Link to="/" className="add-pain-form-back">
          {" "}
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link> */}
          <h2>Cadastrar Dor</h2>
        </div>
        <form className="form-inline">
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

          {/* { === 0 ? ( */}
          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={(event) => {
              handleAddPain(event);
              //setShow(true);
            }}
          >
            Cadastrar Dor
          </button>
          {/* ) : (
            <>
              <button className="btn  btn-outline-succes me-2" type="submit">
                Salvar
              </button>
              <button
                className="btn btn-outline-warning "
                onClick={handleCancelar}
              >
                Cancelar
              </button>
            </>
          )} */}
        </form>

        <div className="container p-0 mb-3">
          <div className="row g-3">
            {dados
              .slice()
              .reverse()
              .map((dores) => (
                <div key={dores._id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h6 className="card-title mt-2">{dores.name}</h6>{" "}
                        <div className="d-flex justify-content-end">
                          <button
                            className="btn btn-outline-primary me-2"
                            onClick={() => handleEditar(dores._id)}
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

export default addPain;
