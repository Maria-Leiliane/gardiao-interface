import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SupportContact} from '../../core/models/support-contact.model';
import {User} from '../../core/models/user.model';
import {UserService} from '../../core/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  contacts: SupportContact[] = [];
  loading = true;

  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  contactForm!: FormGroup;

  msgPerfil = '';
  msgSenha = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.iniciarFormularios();
    this.carregarDados();
  }

  iniciarFormularios(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      theme: ['']
    });

    this.passwordForm = this.fb.group({
      current: ['', Validators.required],
      next: ['', [Validators.required, Validators.minLength(6)]]
    });

    // ATUALIZADO AQUI: Usando os campos exatos do seu modelo
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      nickname: [''],
      contact_email: ['', [Validators.required, Validators.email]],
      phone: [''],
      notification_preference: ['EMAIL'] // Um valor padrão
    });
  }

  carregarDados(): void {
    this.userService.getProfile().subscribe({
      next: (dados) => {
        this.user = dados;
        this.profileForm.patchValue({
          name: dados.name,
          theme: dados.theme
        });
        this.loading = false;
      }
    });
    this.carregarContatos();
  }

  carregarContatos(): void {
    this.userService.getSupportContacts().subscribe(contatos => this.contacts = contatos);
  }

  atualizarPerfil(): void {
    if (this.profileForm.invalid) return;

    this.userService.updateProfile(this.profileForm.value).subscribe({
      next: (userAtualizado) => {
        this.user = userAtualizado;
        this.msgPerfil = 'Perfil atualizado com sucesso! ✅';
        setTimeout(() => this.msgPerfil = '', 3000);
      },
      error: () => this.msgPerfil = 'Erro ao atualizar perfil. ❌'
    });
  }

  atualizarSenha(): void {
    if (this.passwordForm.invalid) return;

    this.userService.updatePassword(this.passwordForm.value).subscribe({
      next: () => {
        this.msgSenha = 'Senha alterada com sucesso! ✅';
        this.passwordForm.reset();
        setTimeout(() => this.msgSenha = '', 3000);
      },
      error: () => this.msgSenha = 'Erro ao alterar senha. ❌'
    });
  }

  adicionarContato(): void {
    if (this.contactForm.invalid) return;

    this.userService.addSupportContact(this.contactForm.value).subscribe(() => {
      this.carregarContatos();
      this.contactForm.reset({ notification_preference: 'EMAIL' }); // Reseta mantendo o padrão
    });
  }

  // ATUALIZADO AQUI: Recebe contact_id
  removerContato(contact_id: string | undefined): void {
    if (!contact_id) return;

    if (confirm('Tem certeza que deseja remover este guardião?')) {
      this.userService.deleteSupportContact(contact_id).subscribe(() => {
        this.carregarContatos();
      });
    }
  }
}
