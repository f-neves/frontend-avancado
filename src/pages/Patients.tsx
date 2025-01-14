import { useNavigate } from "react-router-dom";
import GenericTable from "./GenericTable/GenericTable";
import "../../css/index.css";
import "../../css/main.css";
import "../../css/paginas.css";

const Pacientes = () => {
  const navigate = useNavigate();

  const headers = {
    nome: "Nome",
    cpf: "CPF",
    dataNascimento: "Data de Nascimento",
    sexo: "Sexo",
  };

  const data = [
    { nome: "João Silva", cpf: "12345678901", dataNascimento: "01/01/1980", sexo: "Masculino" },
    { nome: "Maria Oliveira", cpf: "98765432100", dataNascimento: "15/05/1995", sexo: "Feminino" },
    { nome: "Carlos Santos", cpf: "65432109876", dataNascimento: "20/08/1990", sexo: "Masculino" },
  ];

  const handleCadastrarPaciente = () => {
    navigate("/cadastro-pacientes");
  };

  return (
    <div>
      <div className="header">Pacientes Cadastrados</div>
      <main>
        <GenericTable
          headers={headers}
          data={data}
          actions={(item) => (
            <button
              onClick={() => alert(`Editando o paciente: ${item.nome}`)}
              className="edit-button"
            >
              Editar
            </button>
          )}
        />
        <button
          onClick={handleCadastrarPaciente}
          className="edit-button"
        >
          Cadastrar Novo Paciente
        </button>
      </main>
      <footer>
        <p>&copy; 2024 STP. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Pacientes;
