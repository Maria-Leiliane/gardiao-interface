import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { GamificationComponent } from './features/gamification/gamification.component';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
  // Rota padrão (quando o usuário acessa apenas localhost:4200)
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Nossas telas independentes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'gamification', component: GamificationComponent },
  { path: 'profile', component: ProfileComponent },

  // O módulo de hábitos (que tem suas próprias sub-rotas como /novo e /:id)
  {
    path: 'habits',
    loadChildren: () => import('./features/habits/habits.module').then(m => m.HabitsModule)
  },

  // Rota de fallback: se digitar uma URL que não existe, joga pro dashboard
  { path: '**', redirectTo: '/dashboard' }
];
