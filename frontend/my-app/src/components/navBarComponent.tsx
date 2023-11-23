import { Link } from "react-router-dom";

function navBarComponent() {
  return (
    <header
      className="site-header sticky-top py-3"
      style={{ backgroundColor: "#ADD8E6" }}
    >
      <nav className="container d-flex flex-column flex-md-row justify-content-between">
        <Link to="/" className="py-2 text-dark text-decoration-none">
          Home
        </Link>

        <Link
          to="/addMedicine"
          className="py-2 d-none d-md-inline-block text-dark text-decoration-none"
        >
          Adicionar Remédio
        </Link>
        <Link
          to="/addPain"
          className="py-2 d-none d-md-inline-block text-dark text-decoration-none"
        >
          Adicionar Dor
        </Link>

        <Link
          to="/registerMedicine"
          className="py-2 d-none d-md-inline-block text-dark text-decoration-none"
        >
          Registrar Remédio
        </Link>

        <Link
          to="/registerPain"
          className="py-2 d-none d-md-inline-block text-dark text-decoration-none"
        >
          Registrar Dor
        </Link>

        <Link
          to="/estMedicine"
          className="py-2 d-none d-md-inline-block text-dark text-decoration-none"
        >
          Estatísticas Remédio
        </Link>

        <Link
          to="/estDor"
          className="py-2 d-none d-md-inline-block text-dark text-decoration-none"
        >
          Estatísticas Dor
        </Link>
      </nav>

      {/* <Link
        to="/addMedicine"
        className="py-2 d-none d-md-inline-block text-dark text-decoration-none"
      >
        Estatísticas Remédio
      </Link> */}
    </header>
  );
}
export default navBarComponent;
