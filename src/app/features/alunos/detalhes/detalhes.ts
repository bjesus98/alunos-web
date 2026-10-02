import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {
  MatProgressSpinnerModule
} from '@angular/material/progress-spinner';

import { AlunoService } from '../../../core/services/aluno';
import { AuthService } from '../../../core/services/auth';
import {
  AlunoDetalhes
} from '../../../shared/models/aluno-detalhes.model';

@Component({
  selector: 'app-detalhes',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './detalhes.html',
  styleUrl: './detalhes.css',
})
export class Detalhes implements OnInit {

  private readonly alunoService = inject(AlunoService);

  private readonly authService = inject(AuthService);

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  readonly aluno = signal<AlunoDetalhes | null>(
    null
  );

  readonly carregando = signal(true);

  readonly mensagemErro = signal('');

  readonly ehAdministrador =
    this.authService.ehAdministrador();

  ngOnInit(): void {
    this.carregarAluno();
  }

  carregarAluno(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!Number.isInteger(id) || id <= 0) {
      this.carregando.set(false);

      this.mensagemErro.set(
        'O identificador do aluno é inválido.'
      );

      return;
    }

    this.carregando.set(true);
    this.mensagemErro.set('');
    this.aluno.set(null);

    this.alunoService
      .buscarPorId(id)
      .subscribe({
        next: (aluno) => {
          this.aluno.set(aluno);
          this.carregando.set(false);
        },

        error: (erro) => {
          console.error(
            'Erro ao carregar aluno:',
            erro
          );

          this.aluno.set(null);
          this.carregando.set(false);

          if (erro.status === 404) {
            this.mensagemErro.set(
              'Aluno não encontrado.'
            );

            return;
          }

          if (erro.status === 401) {
            this.mensagemErro.set(
              'É necessário realizar o login.'
            );

            return;
          }

          if (erro.status === 403) {
            this.mensagemErro.set(
              'Você não possui permissão para consultar este aluno.'
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
            'Não foi possível carregar os detalhes do aluno.'
          );
        }
      });
  }

  voltar(): void {
    this.router.navigate([
      '/alunos'
    ]);
  }

  editar(): void {
    const alunoAtual = this.aluno();

    if (!alunoAtual) {
      return;
    }

    this.router.navigate([
      '/alunos',
      alunoAtual.id,
      'editar'
    ]);
  }
}