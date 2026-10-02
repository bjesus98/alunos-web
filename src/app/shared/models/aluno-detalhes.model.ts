import {
  StatusAluno
} from './aluno-listagem.model';

export interface AlunoDetalhes {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  matricula: string;
  status: StatusAluno;
}