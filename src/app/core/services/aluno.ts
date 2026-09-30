import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AlunoListagem } from '../../shared/models/aluno-listagem.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/alunos';

  listarTodos(): Observable<AlunoListagem[]> {
    return this.http.get<AlunoListagem[]>(this.apiUrl);
  }
}