import { useNavigate } from "react-router-dom";
import GenericTable from "./GenericTable/GenericTable";
import "../../css/index.css";
import "../../css/main.css";
import "../../css/paginas.css";

const Medicos = () => {
  const navigate = useNavigate();

  const headers = {
    nome: "Nome",
    crm: "CRM",
    especialidade: "Especialidade",
    papel: "Papel",
  };

  const data = [
    { nome: "Dr. João", crm: "12345", especialidade: "Cardiologia", papel: "Chefe" },
    { nome: "Dra. Maria", crm: "67890", especialidade: "Pediatria", papel: "Assistente" },
    { nome: "Dr. Pedro", crm: "54321", especialidade: "Dermatologia", papel: "Residente" },
  ];

  const handleCadastrarMedico = () => {
    navigate("/cadastro-medicos");
  };

  return (
    <div>
      <div className="header">Médicos Cadastrados</div>
      <main>
        <GenericTable
          headers={headers}
          data={data}
          actions={(item) => (
            <button
              onClick={() => alert(`Editando ${item.nome}`)}
              className="edit-button"
            >
              Editar
            </button>
          )}
        />
        <button
          onClick={handleCadastrarMedico}
          className="edit-button"
        >
          Cadastrar Novo Médico
        </button>
      </main>
      <footer>
        <p>&copy; 2024 STP. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Medicos;
