import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericTable from "./GenericTable/GenericTable";
import { getTransferencias } from "../services/transfers.api";
import "../../css/index.css";
import "../../css/main.css";
import "../../css/paginas.css";
import { getPacienteById } from "../services/patients.api";
import { TabelaTransferencia } from "../types/transfers.type";

const Transferencias = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<TabelaTransferencia[]>([]); // Define o tipo explícito do estado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const headers = {
    paciente: "Paciente",
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
    const processarTransferencias = async () => {
      try {
        const dataTransferencia = await getTransferencias();
        const formattedData: TabelaTransferencia[] = await Promise.all(
          dataTransferencia.map(async (transferencia: any) => {
            const dataPaciente = await getPacienteById(
              transferencia.solicitacao.pacienteId as string
            );


            return {
              paciente: dataPaciente.nome,
              origem: transferencia.origem?.nome || "Desconhecido",
              destino: transferencia.destino?.nome || "Desconhecido",
              data: transferencia.horarioSaida
                ? new Date(transferencia.horarioSaida).toLocaleDateString("pt-BR")
                : "Não informado",
              classificacao: transferencia.classificacao || "Sem classificação",
              procedimentosAcondicionamento: transferencia.procedimentosAcondicionamento || "Nenhum",
              procedimentosUnidadeDestino: transferencia.procedimentosUnidadeDestino || "Nenhum",
              distancia: `${transferencia.distancia || 0} km`,
              meioDeTransporte: transferencia.meioTransporte || "Indefinido",
              status: transferencia.status || "Indefinido",
              motivo: transferencia.solicitacao?.justificativa || "Não especificado",
            };
          })
        );
        console.log("formattedData",formattedData);

        setData(formattedData); // Atualiza o estado com os dados formatados
      } catch (error) {
        console.error("Erro ao processar transferências:", error);
        setError("Não foi possível carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    processarTransferencias();
  }, []); // Adicionado array de dependências vazio para evitar chamadas infinitas

  const handleCadastrarTransferencia = () => {
    navigate("/cadastro-transferencias");
  };

  const handleEditarTransferencia = (id: string) => {
    navigate(`/editar-transferencias/${id}`);
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
              onClick={() => handleEditarTransferencia(item.id as string)}
              className="edit-button"
            >
              Detalhes
            </button>
          )}
        />
        <button className="edit-button" onClick={handleCadastrarTransferencia}>
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
