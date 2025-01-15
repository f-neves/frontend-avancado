import { Link } from "react-router-dom";
import "../../css/index.css";
import "../../css/main.css";
import "../../css/paginas.css";

function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <Link className="logo" to="/">
          <img src="logo.png" alt="Logo STP" />
        </Link>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/pacientes">Pacientes</Link>
        <Link to="/hospitais">Hospitais</Link>
        <Link to="/transferencias">Transferências</Link>
        <Link to="/medicos">Médicos</Link>
      </nav>
    </div>
  );
}

export default Navbar;
