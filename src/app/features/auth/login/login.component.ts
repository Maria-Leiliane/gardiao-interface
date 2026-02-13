import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // RouterLink é importante para o botão de "Cadastre-se"!
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Regras rígidas para o formulário
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    // 1. Limpa qualquer aviso antigo da tela
    this.errorMessage = '';
    this.successMessage = '';

    // 2. Se o usuário tentou dar "migué" e clicou sem preencher
    if (this.form.invalid) {
      this.errorMessage = 'Por favor, preencha o e-mail e a senha corretamente.';
      this.form.markAllAsTouched(); // Deixa as bordas vermelhas nos campos vazios
      return;
    }

    // 3. Liga o modo "carregando" no botão
    this.isLoading = true;

    // 4. Dispara a requisição para o seu servidor (O famoso .subscribe!)
    this.authService.login(this.form.value).subscribe({
      next: (resposta) => {
        // SUCESSO! 🟢
        this.successMessage = 'Login realizado com sucesso! Preparando seu painel...';

        // Espera 1.5 segundos para o usuário conseguir ler a mensagem antes de mudar de tela
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (erro) => {
        // ERRO! 🔴
        this.isLoading = false;

        if (erro.status === 401 || erro.status === 404) {
          this.errorMessage = 'E-mail ou senha incorretos.';
        } else if (erro.status === 0) {
          this.errorMessage = 'O servidor está desligado. Ligue a API do Go Guardião!';
        } else {
          this.errorMessage = 'Ops! Algo deu errado. Tente novamente mais tarde.';
        }
        console.error('Falha no login:', erro);
      }
    });
  }
}
