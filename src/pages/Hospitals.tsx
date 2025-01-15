import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericTable from "./GenericTable/GenericTable";
import { getHospitais } from "../services/hospitals.api";
import "../../css/index.css";
import "../../css/main.css";
import "../../css/paginas.css";

const Hospitais = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const headers = {
    name: "Nome",
    phone: "Telefone",
    email: "Email",
    address: "Endereço",
  };

useEffect(() => {
    const fetchData = async () => {
      try {
        const hospitals = await getHospitais();
        // Formatar os dados para a tabela
        const formattedData = hospitals.map((hospital) => ({
          name: hospital.nome || "Desconhecido",
          phone: hospital.telefone || "Não informado",
          email: hospital.email || "Não informado",
          address: hospital.endereco
            ? `${hospital.endereco.rua}, ${hospital.endereco.bairro}, ${hospital.endereco.cidade} - ${hospital.endereco.estado}, ${hospital.endereco.cep}`
            : "Endereço não disponível",
          id: hospital.id, // Necessário para identificar ações específicas
        }));

        setData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCadastrarHospital = () => {
    navigate("/cadastro-hospitais");
  };

  const handleEditarHospital = (id: string) => {
    navigate(`/editar-unidades-hospitalares/${id}`); // Redireciona para a página de edição do paciente
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <div className="header">Hospitais Cadastrados</div>
      <main>
        <GenericTable
          headers={headers}
          data={data}
          actions={(item: Record<string, unknown>) => (
            <button
              onClick={() => handleEditarHospital(item.id as string)}
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
