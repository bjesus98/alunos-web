import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import {
  LoginDados,
  LoginResposta,
  Perfil
} from '../../shared/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http:' + '//' + 'localhost:8080/auth/login';

  private readonly chaveToken = 'alunos_token';

  private readonly chavePerfil = 'alunos_perfil';

  login(
    dados: LoginDados
  ): Observable<LoginResposta> {
    return this.http
      .post<LoginResposta>(
        this.apiUrl,
        dados
      )
      .pipe(
        tap(resposta => {
          this.salvarAutenticacao(resposta);
        })
      );
  }

  logout(): void {
    sessionStorage.removeItem(
      this.chaveToken
    );

    sessionStorage.removeItem(
      this.chavePerfil
    );
  }

  obterToken(): string | null {
    return sessionStorage.getItem(
      this.chaveToken
    );
  }

  obterPerfil(): Perfil | null {
    return sessionStorage.getItem(
      this.chavePerfil
    ) as Perfil | null;
  }

  estaAutenticado(): boolean {
    return this.obterToken() !== null;
  }

  ehAdministrador(): boolean {
    return this.obterPerfil() === 'ADMINISTRADOR';
  }

  private salvarAutenticacao(
    resposta: LoginResposta
  ): void {
    sessionStorage.setItem(
      this.chaveToken,
      resposta.token
    );

    sessionStorage.setItem(
      this.chavePerfil,
      resposta.perfil
    );
  }
}
