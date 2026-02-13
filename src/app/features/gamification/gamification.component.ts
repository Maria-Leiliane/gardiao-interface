import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserMana} from '../../core/models/user.model';
import {Challenge, Reward} from '../../core/models/challenge.model';
import {LeaderboardEntry} from '../../core/models/leaderboard.model';
import {GamificationService} from '../../core/services/gamification.service';

@Component({
  selector: 'app-gamification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gamification.component.html',
})
export class GamificationComponent implements OnInit {
  mana: UserMana | null = null;
  challenges: Challenge[] = [];
  rewards: Reward[] = [];
  leaderboard: LeaderboardEntry[] = [];

  loading = true;
  mensagem = '';

  constructor(private gamificationService: GamificationService) {}

  ngOnInit(): void {
    this.carregarTudo();
  }

  carregarTudo(): void {
    this.loading = true;

    // Busca o saldo atual
    this.gamificationService.getManaBalance().subscribe(m => this.mana = m);

    // Busca como ganhar Mana (Desafios ativos)
    this.gamificationService.getChallenges().subscribe(c => {
      this.challenges = c.filter(desafio => desafio.is_active !== false);
    });

    // Busca como gastar Mana (Recompensas disponíveis)
    this.gamificationService.getRewards().subscribe(r => {
      this.rewards = r.filter(recompensa => recompensa.is_available !== false);
    });

    // Busca o Ranking
    this.gamificationService.getLeaderboard().subscribe(l => {
      this.leaderboard = l;
      this.loading = false;
    });
  }

  resgatarRecompensa(recompensa: Reward): void {
    // Trava de segurança no frontend
    if (!this.mana || this.mana.balance < recompensa.cost) {
      this.exibirMensagem('❌ Você não tem Mana suficiente para isso.');
      return;
    }

    if (confirm(`Deseja gastar ${recompensa.cost} Mana para resgatar "${recompensa.name}"?`)) {
      this.gamificationService.redeemReward(recompensa.id).subscribe({
        next: () => {
          this.exibirMensagem(`✨ Sucesso! Você resgatou: ${recompensa.name}`);
          this.carregarTudo(); // Recarrega os dados para atualizar o saldo
        },
        error: () => this.exibirMensagem('❌ Erro ao tentar resgatar recompensa.')
      });
    }
  }

  exibirMensagem(texto: string): void {
    this.mensagem = texto;
    setTimeout(() => this.mensagem = '', 4000); // Apaga a mensagem após 4 segundos
  }
}
