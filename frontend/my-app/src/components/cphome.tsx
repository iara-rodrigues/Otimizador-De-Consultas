// import { Routes, Route, Link } from "react-router-dom";
// import router from "../Router";
// import addMedicine from "./addMedicine";
// import addPain from "./addPain";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
// import Image from "react-bootstrap/Image";
// import Img from "react-image";
import ImgPath from "../img/home.gif";

function home() {
  return (
    //<div className="menu-wrap">
    <div className="mt-3 container">
      <div className="d-flex justify-content-between">
        <div className="col-md-6">
          {/* <header className="menu"> */}
          <h1 className="font-weight-bold">Otimizador de Consultas</h1>
          <p className="lead">Diário de Saúde para Diagnósticos Confiáveis</p>
          <ListGroup>
            <Link to="/addMedicine">
              <ListGroup.Item action>Cadastrar Novo Remédio</ListGroup.Item>
            </Link>
            <Link to="/addPain">
              <ListGroup.Item action>Cadastrar Nome da Dor</ListGroup.Item>
            </Link>
            <Link to="/registerMedicine">
              <ListGroup.Item action>Registrar Uso do Remédio</ListGroup.Item>
            </Link>
            <Link to="/registerPain">
              <ListGroup.Item action>
                Registrar Ocorrência de Dor
              </ListGroup.Item>
            </Link>
            {/* <Link to="/registerPain"> */}
            <ListGroup.Item action>
              Visualizar Estatísticas de Uso de Remédio
            </ListGroup.Item>
            {/* </Link> */}
            {/* <Link to="/registerPain"> */}
            <ListGroup.Item action>
              Visualizar Estatísticas de Dor
            </ListGroup.Item>
            {/* </Link> */}
          </ListGroup>
        </div>
        <div className="col-md-5">
          <img src={ImgPath} className="img-fluid" alt="Imagem tema" />
        </div>
      </div>
    </div>
  );
}

export default home;
