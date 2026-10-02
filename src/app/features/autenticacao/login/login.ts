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
import { finalize } from 'rxjs';

import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  readonly ocultarSenha = signal(true);

  readonly carregando = signal(false);

  readonly mensagemErro = signal('');

  readonly formulario = new FormGroup({
    login: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(100)
      ]
    }),

    senha: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    })
  });

  alternarVisibilidadeSenha(): void {
    this.ocultarSenha.update(
      valorAtual => !valorAtual
    );
  }

  entrar(): void {
    this.formulario.markAllAsTouched();
    this.mensagemErro.set('');

    if (this.formulario.invalid) {
      return;
    }

    const dados = this.formulario.getRawValue();

    this.formulario.disable();
    this.carregando.set(true);

    this.authService
      .login(dados)
      .pipe(
        finalize(() => {
          this.formulario.enable();
          this.carregando.set(false);
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate([
            '/alunos'
          ]);
        },

        error: (erro) => {
          console.error(
            'Erro durante o login:',
            erro
          );

          if (erro.status === 401) {
            this.mensagemErro.set(
              'Login ou senha inválidos.'
            );
            return;
          }

          if (erro.status === 0) {
            this.mensagemErro.set(
              'Não foi possível conectar ao servidor.'
            );
            return;
          }

          this.mensagemErro.set(
            'Não foi possível realizar o login.'
          );
        }
      });
  }
}