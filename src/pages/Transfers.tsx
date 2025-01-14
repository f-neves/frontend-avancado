import { useNavigate } from "react-router-dom";
import "../../css/index.css"
import "../../css/main.css"
import "../../css/paginas.css"

const Transferencias = () => {

const navigate = useNavigate();
const handleCadastrarTransferencia = () => {
  navigate("/cadastro-transferencias");
};

  return (
    <div>
      <div className="header">
        Solicitações Cadastradas
      </div>
      <header>
      </header>
      <main>
        <section>
          <table className="transferencias-table">
            <thead>
              <tr>
                <th>Origem</th>
                <th>Destino</th>
                <th>Data</th>
                <th>Classificação</th>
                <th>Procedimentos Acondicionamento</th>
                <th>Procedimentos Unidade Destino</th>
                <th>Distância</th>
                <th>Meio de Transporte</th>
                <th>Ações</th>
                <th>Status</th>
                <th>Motivo</th>
              </tr>
            </thead>
            <tbody id="transferTableBody">
              {/* Linhas geradas dinamicamente */}
            </tbody>
          </table>

          <button
            className="add-transferencia-button"
            onClick={handleCadastrarTransferencia}
          >
            Cadastrar Nova Solicitação
          </button>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 STP. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Transferencias;
