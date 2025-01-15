export type Hospital = {
  nome: string;
  telefone?: string;
  email?: string;
  endereco: {
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  dadosPessoal?: string;
  disponibilidadeLeitos?: number;
  temUTI?: boolean;
};