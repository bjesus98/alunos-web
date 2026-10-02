import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AlunoListagem,
  FiltroAlunos,
  PaginaResposta
} from '../../shared/models/aluno-listagem.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8080/alunos';

  listarTodos(
    filtros: FiltroAlunos = {}
  ): Observable<PaginaResposta<AlunoListagem>> {
    let parametros = new HttpParams()
      .set(
        'page',
        String(filtros.page ?? 0)
      )
      .set(
        'size',
        String(filtros.size ?? 10)
      )
      .set(
        'status',
        filtros.status ?? 'ATIVO'
      );

    const busca = filtros.busca?.trim();

    if (busca) {
      parametros = parametros.set(
        'busca',
        busca
      );
    }

    return this.http.get<
      PaginaResposta<AlunoListagem>
    >(
      this.apiUrl,
      {
        params: parametros
      }
    );
  }
}