import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';
import {
  MatProgressSpinnerModule
} from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { AlunoService } from '../../../core/services/aluno';
import {
  AlunoListagem,
  FiltroAlunos,
  FiltroStatusAluno
} from '../../../shared/models/aluno-listagem.model';

@Component({
  selector: 'app-listagem',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule
  ],
  templateUrl: './listagem.html',
  styleUrl: './listagem.css',
})
export class Listagem implements OnInit {

  private readonly alunoService =
    inject(AlunoService);

  readonly alunos = signal<AlunoListagem[]>([]);

  readonly carregando = signal(false);

  readonly mensagemErro = signal('');

  readonly paginaAtual = signal(0);

  readonly tamanhoPagina = signal(10);

  readonly totalElementos = signal(0);

  readonly totalPaginas = signal(0);

  readonly campoBusca = new FormControl('', {
    nonNullable: true
  });

  readonly campoStatus =
    new FormControl<FiltroStatusAluno>(
      'ATIVO',
      {
        nonNullable: true
      }
    );

  readonly opcoesTamanhoPagina = [
    5,
    10,
    25
  ];

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
      busca: this.campoBusca.value,
      status: this.campoStatus.value,
      page: this.paginaAtual(),
      size: this.tamanhoPagina()
    };

    this.alunoService
      .listarTodos(filtros)
      .subscribe({
        next: (resposta) => {
          this.alunos.set(
            resposta.conteudo
          );

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

          this.alunos.set([]);
          this.totalElementos.set(0);
          this.totalPaginas.set(0);
          this.carregando.set(false);

          if (erro.status === 401) {
            this.mensagemErro.set(
              'É necessário realizar o login.'
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

          if (erro.status === 400) {
            this.mensagemErro.set(
              erro.error?.mensagem ??
              'Os filtros informados são inválidos.'
            );
            return;
          }

          this.mensagemErro.set(
            'Não foi possível carregar os alunos.'
          );
        }
      });
  }

  aplicarFiltros(): void {
    this.paginaAtual.set(0);
    this.carregarAlunos();
  }

  limparBusca(): void {
    this.campoBusca.setValue('');
    this.paginaAtual.set(0);
    this.carregarAlunos();
  }

  limparFiltros(): void {
    this.campoBusca.setValue('');
    this.campoStatus.setValue('ATIVO');
    this.paginaAtual.set(0);
    this.tamanhoPagina.set(10);

    this.carregarAlunos();
  }

  alterarStatus(
  status: FiltroStatusAluno
): void {
  this.campoStatus.setValue(
    status,
    {
      emitEvent: false
    }
  );

  this.paginaAtual.set(0);
  this.carregarAlunos();
}

  alterarPagina(evento: PageEvent): void {
    const tamanhoFoiAlterado =
      evento.pageSize !== this.tamanhoPagina();

    this.tamanhoPagina.set(
      evento.pageSize
    );

    this.paginaAtual.set(
      tamanhoFoiAlterado
        ? 0
        : evento.pageIndex
    );

    this.carregarAlunos();
  }
}