import { Component, OnInit } from '@angular/core';
import {User, UserMana} from '../../core/models/user.model';
import {Habit} from '../../core/models/habit.model';
import {UserService} from '../../core/services/user.service';
import {HabitService} from '../../core/services/habit.service';
import {GamificationService} from '../../core/services/gamification.service';
import {Challenge} from '../../core/models/challenge.model';
import {ButtonComponent} from '../../shared/components/button/button.component';
import {CommonModule} from '@angular/common';
import {CardComponent} from '../../shared/components/card/card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, CardComponent, ButtonComponent]
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  mana: UserMana | null = null;
  habits: Habit[] = [];
  challenges: Challenge[] = [];
  loading = true;

  constructor(
    private userService: UserService,
    private habitService: HabitService,
    private gamificationService: GamificationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.userService.getProfile().subscribe(u => this.user = u);
    this.gamificationService.getManaBalance().subscribe(m => this.mana = m);
    this.habitService.getHabits().subscribe(h => this.habits = h);
    this.gamificationService.getChallenges().subscribe(c => {
      this.challenges = c;
      this.loading = false;
    });
  }

  logHabit(habitId: string): void {
    this.habitService.logHabit(habitId).subscribe(() => {
      this.gamificationService.getManaBalance().subscribe(m => this.mana = m);
    });
  }

  get manaPercentage(): number {
    if (!this.mana) return 0;
    const nextLevel = Math.ceil((this.mana.balance + 1) / 500) * 500;
    return (this.mana.balance / nextLevel) * 100;
  }

  get currentLevel(): number {
    if (!this.mana) return 1;
    return Math.floor(this.mana.balance / 500) + 1;
  }
}
