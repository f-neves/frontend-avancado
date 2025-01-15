import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericTable from "./GenericTable/GenericTable";
import { getMedicos } from "../services/doctors.api";
import "../../css/index.css";
import "../../css/main.css";
import "../../css/paginas.css";

const Medicos = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const headers = {
    nome: "Nome",
    crm: "CRM",
    especialidade: "Especialidade",
    papel: "Papel",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctors = await getMedicos();
        setData(doctors);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCadastrarMedico = () => {
    navigate("/cadastro-medicos");
  };

  const handleEditarMedico = (id: string) => {
    navigate(`/editar-medicos/${id}`); // Redireciona para a página de edição do paciente
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <div className="header">Médicos Cadastrados</div>
      <main>
        <GenericTable
          headers={headers}
          data={data}
          actions={(item: Record<string, unknown>) => (
            <button
              onClick={() => handleEditarMedico(item.id as string)}
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
