export interface AlunoListagem {
  id: number;
  nome: string;
  matricula: string;
  status: 'ATIVO' | 'INATIVO';
}