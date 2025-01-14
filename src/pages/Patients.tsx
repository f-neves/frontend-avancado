import { useNavigate } from "react-router-dom";
import "../../css/index.css"
import "../../css/main.css"
import "../../css/paginas.css"

const Pacientes = () => {

  const navigate = useNavigate();
  
  const handleCadastrarPaciente = () => {
    navigate("/cadastro-pacientes");
  };

  return (
    <div>
      <div className="header">
        Pacientes Cadastrados
      </div>
      <main>
        <section>
          <table className="pacientes-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Data de Nascimento</th>
                <th>Sexo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="pacienteTableBody">
              {/* Linhas geradas dinamicamente */}
            </tbody>
          </table>
          <button
            onClick={handleCadastrarPaciente}
            className="add-paciente-button"
          >
            Cadastrar Novo Paciente
          </button>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 STP. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Pacientes;
