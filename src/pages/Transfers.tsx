import { useNavigate } from "react-router-dom";
import GenericTable from "./GenericTable/GenericTable";
import "../../css/index.css";
import "../../css/main.css";
import "../../css/paginas.css";

const Transferencias = () => {
  const navigate = useNavigate();

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

  const data = [
    {
      origem: "Hospital A",
      destino: "Hospital B",
      data: "12/01/2025",
      classificacao: "Alta",
      procedimentosAcondicionamento: "Frio",
      procedimentosUnidadeDestino: "Documentos",
      distancia: "15 km",
      meioDeTransporte: "Ambulância",
      status: "Aprovado",
      motivo: "Urgência",
    },
    {
      origem: "Hospital C",
      destino: "Hospital D",
      data: "10/01/2025",
      classificacao: "Média",
      procedimentosAcondicionamento: "Ambiente",
      procedimentosUnidadeDestino: "Avaliação médica",
      distancia: "25 km",
      meioDeTransporte: "Helicóptero",
      status: "Pendente",
      motivo: "Emergência",
    },
    {
      origem: "Hospital E",
      destino: "Hospital F",
      data: "08/01/2025",
      classificacao: "Baixa",
      procedimentosAcondicionamento: "Ambiente",
      procedimentosUnidadeDestino: "Conferência",
      distancia: "10 km",
      meioDeTransporte: "Ambulância",
      status: "Cancelado",
      motivo: "Paciente estável",
    },
  ];

  const handleCadastrarTransferencia = () => {
    navigate("/cadastro-transferencias");
  };

  return (
    <div>
      <div className="header">Solicitações Cadastradas</div>
      <main>
        <GenericTable
          headers={headers}
          data={data}
          actions={(item) => (
            <button
              onClick={() => alert(`Detalhes da transferência de ${item.origem} para ${item.destino}`)}
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
