import { useNavigate } from "react-router-dom";
import GenericTable from "./GenericTable/GenericTable";
import "../../css/index.css";
import "../../css/main.css";
import "../../css/paginas.css";

const Hospitais = () => {
  const navigate = useNavigate();

  const headers = {
    name: "Nome",
    phone: "Telefone",
    email: "Email",
    address: "Endereço",
  };

  const data = [
    { name: "Hospital A", phone: "12345-6789", email: "a@hospital.com", address: "Rua 1" },
    { name: "Hospital B", phone: "98765-4321", email: "b@hospital.com", address: "Rua 2" },
  ];

  const handleCadastrarHospital = () => {
    navigate("/cadastro-hospitais");
  };

  return (
    <div>
      <div className="header">Hospitais Cadastrados</div>
      <main>
        <GenericTable
          headers={headers}
          data={data}
          actions={(item) => (
            <button
              onClick={() => alert(`Editando ${item.name}`)}
              className="edit-button"
            >
              Editar
            </button>
          )}
        />
        <button onClick={handleCadastrarHospital} className="edit-button">
          Cadastrar Novo Hospital
        </button>
      </main>
      <footer>
        <p>&copy; 2024 STP. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Hospitais;
