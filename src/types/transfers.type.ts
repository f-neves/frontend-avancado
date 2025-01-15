export interface Transfer {
  id: string;
  origem: {
    id: string;
    nome: string;
    telefone: string;
    email: string;
    enderecoid: string;
    dadosPessoal: string;
    disponibilidadeLeitos: number;
    temUTI: boolean;
  };
  destino: {
    id: string;
    nome: string;
    telefone: string;
    email: string;
    enderecoid: string;
    dadosPessoal: string;
    disponibilidadeLeitos: number;
    temUTI: boolean;
  };
  horarioPrevistoChegada: string;
  horarioSaida: string;
  classificacao: string;
  procedimentosAcondicionamento: string;
  procedimentosUnidadeDestino: string;
  distancia: number;
  meioTransporte: string;
  status: string;
  motivo?: string;
  medicamento: {
    id: string;
    nome: string;
    principioAtivo: string;
    descricao: string;
    dosagem: string;
    transferenciaIDs: string[];
  }[];
  medicamentoIDs: string[];
  solicitacao: {
    id: string;
    dataSolicitacao: string;
    dataAprovacao: string;
    justificativa: string;
    medicoOrigemId: string;
    pacienteId: string;
    prioridade: string;
    status: string;
    motivoRecusa?: string | null;
  };
  solicitacaoId: string;
}

export interface TabelaTransferencia extends Record<string, unknown> {
  paciente: string;
  origem: string;
  destino: string;
  data: string;
  classificacao: string;
  procedimentosAcondicionamento: string;
  procedimentosUnidadeDestino: string;
  distancia: string;
  meioDeTransporte: string;
  status: string;
  motivo: string;
}