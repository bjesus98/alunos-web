import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { AlunoService } from '../../../core/services/aluno';
import { AlunoListagem } from '../../../shared/models/aluno-listagem.model';

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

    this.alunoService.listarTodos().subscribe({
      next: (alunos) => {
        this.alunos.set(alunos);
        this.carregando.set(false);
      },

      error: (erro) => {
        console.error('Erro ao carregar alunos:', erro);

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