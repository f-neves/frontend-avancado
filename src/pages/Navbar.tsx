import "../../css/index.css"
import "../../css/main.css"
import "../../css/paginas.css"

function Navbar (){
    return (
        <div>
            <nav className="navbar">
            <a className="logo" href="index">
              <img src="logo.png" alt="Logo STP" />
            </a>
            <a href="/">Home</a>
            <a href="login">Login</a>
            <a href="pacientes">Pacientes</a>
            <a href="hospitais">Hospitais</a>
            <a href="transferencias">Transferências</a>
            <a href="medicos">Médicos</a>
            <div></div>
          </nav>
        </div>
    )
}

export default Navbar