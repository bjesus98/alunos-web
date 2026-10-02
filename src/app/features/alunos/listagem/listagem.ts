import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {
  MatProgressSpinnerModule
} from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { AlunoService } from '../../../core/services/aluno';
import {
  AlunoListagem,
  FiltroAlunos
} from '../../../shared/models/aluno-listagem.model';

@Component({
  selector: 'app-listagem',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  templateUrl: './listagem.html',
  styleUrl: './listagem.css',
})
export class Listagem implements OnInit {

  private readonly alunoService = inject(AlunoService);

  readonly alunos = signal<AlunoListagem[]>([]);
  readonly carregando = signal(false);
  readonly mensagemErro = signal('');

  readonly paginaAtual = signal(0);
  readonly tamanhoPagina = signal(10);
  readonly totalElementos = signal(0);
  readonly totalPaginas = signal(0);

  readonly colunasExibidas = [
    'nome',
    'matricula',
    'status',
    'acoes'
  ];

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos(): void {
    this.carregando.set(true);
    this.mensagemErro.set('');

    const filtros: FiltroAlunos = {
      page: this.paginaAtual(),
      size: this.tamanhoPagina(),
      status: 'ATIVO'
    };

    this.alunoService
      .listarTodos(filtros)
      .subscribe({
        next: (resposta) => {
          this.alunos.set(resposta.conteudo);

          this.paginaAtual.set(
            resposta.pagina
          );

          this.tamanhoPagina.set(
            resposta.tamanho
          );

          this.totalElementos.set(
            resposta.totalElementos
          );

          this.totalPaginas.set(
            resposta.totalPaginas
          );

          this.carregando.set(false);
        },

        error: (erro) => {
          console.error(
            'Erro ao carregar alunos:',
            erro
          );

          this.carregando.set(false);

          if (erro.status === 401) {
            this.mensagemErro.set(
              'É necessário realizar o login para consultar os alunos.'
            );
            return;
          }

          if (erro.status === 403) {
            this.mensagemErro.set(
              'Você não possui permissão para consultar os alunos.'
            );
            return;
          }

          if (erro.status === 0) {
            this.mensagemErro.set(
              'Não foi possível conectar ao backend.'
            );
            return;
          }

          this.mensagemErro.set(
            'Não foi possível carregar os alunos.'
          );
        }
      });
  }
}