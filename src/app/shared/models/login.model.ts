export interface LoginDados {
  login: string;
  senha: string;
}

export type Perfil = 'ADMINISTRADOR' | 'LEITURA';

export interface LoginResposta {
  token: string;
  tipo: string;
  perfil: Perfil;
  expiracaoEmSegundos: number;
}