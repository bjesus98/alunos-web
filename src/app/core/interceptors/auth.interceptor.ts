import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';

const CHAVE_TOKEN = 'alunos_token';
const URL_BACKEND = 'http://localhost:8080';

export const authInterceptor: HttpInterceptorFn = (
  requisicao: HttpRequest<unknown>,
  proximo: HttpHandlerFn
) => {
  const token = sessionStorage.getItem(CHAVE_TOKEN);

  const requisicaoEhDoBackend =
    requisicao.url.startsWith(URL_BACKEND);

  const requisicaoEhLogin =
    requisicao.url.includes('/auth/login');

  if (
    !token ||
    !requisicaoEhDoBackend ||
    requisicaoEhLogin
  ) {
    return proximo(requisicao);
  }

  const requisicaoAutenticada = requisicao.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return proximo(requisicaoAutenticada);
};