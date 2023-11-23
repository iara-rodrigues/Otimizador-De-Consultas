import { Link } from "react-router-dom";
import ImgPath from "../img/home.gif";

function home() {
  return (
    //<div className="menu-wrap">
    <>
      <div style={{ backgroundColor: "#ADD8E6" }}>
        <div
          className="position-relative overflow-hidden p-3 p-md-5 mt-md-0 m-md-3 d-flex"
          style={{ marginTop: "-2px" }}
        >
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 fw-normal">Otimizador de Consultas</h1>
            <p className="lead fw-normal">
              Diário de Saúde para Diagnósticos Confiáveis
            </p>
          </div>
          <img src={ImgPath} className="img-fluid me-5" alt="Imagem tema" />
        </div>
      </div>
      <div className="container p-0  mb-3">
        <div className="row g-3">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="card h-100">
              <Link
                to="/addMedicine"
                className="text-dark text-decoration-none"
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title mt-2">Cadastrar Novo Remédio</h5>{" "}
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="card h-100">
              <Link to="/addPain" className="text-dark text-decoration-none">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title mt-2">Cadastrar Nome da Dor</h5>{" "}
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="card h-100">
              <Link
                to="/registerMedicine"
                className="text-dark text-decoration-none"
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title mt-2">
                      Registrar Uso de Remédio
                    </h5>{" "}
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="card h-100">
              <Link
                to="/registerPain"
                className="text-dark text-decoration-none"
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title mt-2">
                      Registrar Ocorrência de Dor
                    </h5>{" "}
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="card h-100">
              <Link
                to="/estMedicine"
                className="text-dark text-decoration-none"
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title mt-2">
                      Visualizar Estatísticas de Uso de Remédio
                    </h5>{" "}
                  </div>
                </div>{" "}
              </Link>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="card h-100">
              <Link to="/estDor" className="text-dark text-decoration-none">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title mt-2">
                      Visualizar Estatísticas de Dor
                    </h5>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default home;
