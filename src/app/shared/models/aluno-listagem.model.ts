export type StatusAluno = 'ATIVO' | 'INATIVO';

export type FiltroStatusAluno =
  | 'TODOS'
  | StatusAluno;

export interface AlunoListagem {
  id: number;
  nome: string;
  matricula: string;
  status: StatusAluno;
}

export interface PaginaResposta<T> {
  conteudo: T[];
  pagina: number;
  tamanho: number;
  totalElementos: number;
  totalPaginas: number;
  primeira: boolean;
  ultima: boolean;
}

export interface FiltroAlunos {
  busca?: string;
  status?: FiltroStatusAluno;
  page?: number;
  size?: number;
}