import {
  Component,
  inject,
  signal
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatProgressSpinnerModule
} from '@angular/material/progress-spinner';
import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

import { AlunoService } from '../../../core/services/aluno';

@Component({
  selector: 'app-cadastro',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {

  private readonly alunoService = inject(AlunoService);

  private readonly router = inject(Router);

  private readonly snackBar = inject(MatSnackBar);

  readonly salvando = signal(false);

  readonly mensagemErro = signal('');

  readonly formulario = new FormGroup({
    nome: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150)
      ]
    }),

    cpf: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^\d{11}$/)
      ]
    }),

    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(150)
      ]
    }),

    telefone: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^\d{10,11}$/)
      ]
    })
  });

  cadastrar(): void {
    this.formulario.markAllAsTouched();
    this.mensagemErro.set('');

    if (this.formulario.invalid) {
      return;
    }

    const dados = this.formulario.getRawValue();

    this.formulario.disable();
    this.salvando.set(true);

    this.alunoService
      .cadastrar(dados)
      .pipe(
        finalize(() => {
          this.formulario.enable();
          this.salvando.set(false);
        })
      )
      .subscribe({
        next: (resposta) => {
          this.snackBar.open(
            `${resposta.mensagem} Matrícula: ${resposta.matricula}`,
            'Fechar',
            {
              duration: 5000
            }
          );

          this.router.navigate([
            '/alunos'
          ]);
        },

        error: (erro) => {
          console.error(
            'Erro ao cadastrar aluno:',
            erro
          );

          const mensagemBackend =
            erro.error?.mensagem ??
            erro.error?.message ??
            erro.error?.erro ??
            erro.error?.error;

          if (erro.status === 400) {
            this.mensagemErro.set(
              mensagemBackend ??
              'Verifique os dados informados.'
            );
            return;
          }

          if (erro.status === 409) {
            this.mensagemErro.set(
              mensagemBackend ??
              'CPF ou e-mail já cadastrado.'
            );
            return;
          }

          if (erro.status === 401) {
            this.mensagemErro.set(
              'Sua sessão não é válida. Faça login novamente.'
            );
            return;
          }

          if (erro.status === 403) {
            this.mensagemErro.set(
              'Você não possui permissão para cadastrar alunos.'
            );
            return;
          }

          if (erro.status === 404) {
            this.mensagemErro.set(
              mensagemBackend ??
              'O recurso solicitado não foi encontrado.'
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
            mensagemBackend ??
            'Não foi possível cadastrar o aluno.'
          );
        }
      });
  }

  voltar(): void {
    this.router.navigate([
      '/alunos'
    ]);
  }
}