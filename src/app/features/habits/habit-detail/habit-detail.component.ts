import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HabitService } from '../../../core/services/habit.service';
import { Habit } from '../../../core/models/habit.model';

@Component({
  selector: 'app-habit-detail',
  standalone: true,
  // Importamos o DatePipe para formatar as datas do histórico
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './habit-detail.component.html',
})
export class HabitDetailComponent implements OnInit {
  habit: Habit | null = null;
  logs: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private habitService: HabitService
  ) {}

  ngOnInit(): void {
    // Pega o ID da URL (ex: /habits/123 -> id = 123)
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.carregarDetalhes(id);
    }
  }

  carregarDetalhes(id: string): void {
    // Busca os dados do hábito
    this.habitService.getHabitById(id).subscribe({
      next: (dados) => {
        this.habit = dados;
        this.loading = false;
      },
      error: (erro) => {
        console.error('Erro ao buscar detalhes do hábito', erro);
        this.loading = false;
      }
    });

    // Busca o histórico de vezes que o usuário completou o hábito
    this.habitService.getHabitLogs(id).subscribe({
      next: (historico) => {
        this.logs = historico;
      },
      error: (erro) => console.error('Erro ao buscar histórico', erro)
    });
  }
}
