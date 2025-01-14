import { useNavigate } from "react-router-dom";
import "../../css/index.css"
import "../../css/main.css"
import "../../css/paginas.css"

const Hospitais = () => {
  
const navigate = useNavigate();
const handleCadastrarHospital = () => {
  navigate("/cadastro-hospitais");
};

  return (
    <div>
      <div className="header">
        Hospitais Cadastrados
      </div>
      <main>
        <section>
          <table className="hospitais-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Endereço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody className="hospitalTableBody">
              {/* Linhas geradas dinamicamente */}
            </tbody>
          </table>
          <button
            onClick={handleCadastrarHospital}
            className="add-hospital-button"
          >
            Cadastrar Novo Hospital
          </button>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 STP. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Hospitais;
