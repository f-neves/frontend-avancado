export interface Patient {
  id?: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  sexo: string;
}

export type dataPatient = {
  nome: string;
  cpf: string;
  dataNascimento: Date;
  sexo: string;
}