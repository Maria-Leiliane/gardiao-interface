import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../../shared/shared.module';

// src/app/features/auth/auth.module.ts
@NgModule({
  declarations: [], // Deixe vazio
  imports: [
    CommonModule,
    LoginComponent,   // Coloque aqui!
    RegisterComponent // Coloque aqui!
  ]
})
export class AuthModule {}
