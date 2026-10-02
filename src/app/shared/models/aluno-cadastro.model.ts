export interface AlunoCadastro {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

export interface AlunoCadastroResposta {
  id: number;
  matricula: string;
  mensagem: string;
}