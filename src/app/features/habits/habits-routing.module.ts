import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabitListComponent } from './habit-list/habit-list.component';
import { HabitFormComponent } from './habit-form/habit-form.component';
import { HabitDetailComponent } from './habit-detail/habit-detail.component';

const routes: Routes = [
  { path: '', component: HabitListComponent }, // Rota base: /habits
  { path: 'novo', component: HabitFormComponent }, // Rota para criar: /habits/novo
  { path: 'editar/:id', component: HabitFormComponent }, // Rota para editar: /habits/editar/123
  { path: ':id', component: HabitDetailComponent } // Rota para detalhes: /habits/123
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HabitsRoutingModule { }
