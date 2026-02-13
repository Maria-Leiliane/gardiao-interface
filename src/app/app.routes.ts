import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { GamificationComponent } from './features/gamification/gamification.component';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
  // Rota padrão (quando o usuário acessa apenas localhost:4200)
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // telas independentes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'gamification', component: GamificationComponent },
  { path: 'profile', component: ProfileComponent },

  {
    path: 'habits',
    loadChildren: () => import('./features/habits/habits.module').then(m => m.HabitsModule)
  },

  { path: '**', redirectTo: '/dashboard' }
];
