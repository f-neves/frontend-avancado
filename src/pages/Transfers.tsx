import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericTable from "./GenericTable/GenericTable";
import { getTransferencias } from "../services/transfers.api";
import "../../css/index.css";
import "../../css/main.css";
import "../../css/paginas.css";

const Transferencias = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const headers = {
    origem: "Origem",
    destino: "Destino",
    data: "Data",
    classificacao: "Classificação",
    procedimentosAcondicionamento: "Proced. Acondicionamento",
    procedimentosUnidadeDestino: "Proced. Unidade Destino",
    distancia: "Distância",
    meioDeTransporte: "Meio de Transporte",
    status: "Status",
    motivo: "Motivo",
  };

useEffect(() => {
  const fetchData = async () => {
    try {
      const transfers = await getTransferencias();

      // Formatar os dados para a GenericTable
      const formattedData = transfers.map((item) => ({
        origem: item.origem?.nome || "Desconhecido",
        destino: item.destino?.nome || "Desconhecido",
        data: item.horarioSaida
          ? new Date(item.horarioSaida).toLocaleDateString("pt-BR")
          : "Não informado",
        classificacao: item.classificacao || "Sem classificação",
        procedimentosAcondicionamento: item.procedimentosAcondicionamento || "Nenhum",
        procedimentosUnidadeDestino: item.procedimentosUnidadeDestino || "Nenhum",
        distancia: `${item.distancia || 0} km`,
        meioDeTransporte: item.meioTransporte || "Indefinido",
        status: item.status || "Indefinido",
        motivo: item.solicitacao?.justificativa || "Não especificado",
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


  const handleCadastrarTransferencia = () => {
    navigate("/cadastro-transferencias");
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <div className="header">Solicitações Cadastradas</div>
      <main>
        <GenericTable
          headers={headers}
          data={data}
          actions={(item) => (
            <button
              onClick={() =>
                alert(
                  `Detalhes da transferência de ${item.origem} para ${item.destino}`
                )
              }
              className="edit-button"
            >
              Detalhes
            </button>
          )}
        />
        <button
          className="edit-button"
          onClick={handleCadastrarTransferencia}
        >
          Cadastrar Nova Solicitação
        </button>
      </main>
      <footer>
        <p>&copy; 2024 STP. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Transferencias;
