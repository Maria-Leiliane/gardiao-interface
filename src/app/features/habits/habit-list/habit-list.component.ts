import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HabitService } from '../../../core/services/habit.service';
import { Habit } from '../../../core/models/habit.model';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './habit-list.component.html',
})
export class HabitListComponent implements OnInit {
  habits: Habit[] = [];
  loading = true;

  constructor(private habitService: HabitService) {}

  ngOnInit(): void {
    this.carregarHabitos();
  }

  carregarHabitos(): void {
    this.habitService.getHabits().subscribe({
      next: (dados) => {
        this.habits = dados;
        this.loading = false;
      },
      error: (erro) => {
        console.error('Erro ao buscar hábitos', erro);
        this.loading = false;
      }
    });
  }

  registrarExecucao(id: string): void {
    this.habitService.logHabit(id).subscribe(() => {
      // Recarrega a lista para atualizar a ofensiva (streak)
      this.carregarHabitos();
    });
  }
}
