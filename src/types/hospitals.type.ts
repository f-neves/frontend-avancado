export type Hospital = {
  id?: string;
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
  enderecoid?: string;
  dadosPessoal?: string;
  disponibilidadeLeitos?: number;
  temUTI?: boolean;
};