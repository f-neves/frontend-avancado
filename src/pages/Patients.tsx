import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericTable from "./GenericTable/GenericTable";
import { getPacientes } from "../services/patients.api";
import "../../css/index.css";
import "../../css/main.css";
import "../../css/paginas.css";

const Pacientes = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const headers = {
    nome: "Nome",
    cpf: "CPF",
    dataNascimento: "Data de Nascimento",
    sexo: "Sexo",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacientes = await getPacientes();
        setData(pacientes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCadastrarPaciente = () => {
    navigate("/cadastro-pacientes");
  };

  const handleEditarPaciente = (id: string) => {
    navigate(`/editar-pacientes/${id}`); // Redireciona para a página de edição do paciente
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <div className="header">Pacientes Cadastrados</div>
      <main>
        <GenericTable
          headers={headers}
          data={data}
          actions={(item: Record<string, unknown>) => (
            <button
              onClick={() => handleEditarPaciente(item.id as string)}
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
