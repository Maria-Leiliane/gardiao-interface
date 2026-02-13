import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HabitService } from '../../../core/services/habit.service';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './habit-form.component.html',
})
export class HabitFormComponent implements OnInit {
  habitForm!: FormGroup;
  salvando = false;

  constructor(
    private fb: FormBuilder,
    private habitService: HabitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.habitForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      frequency: ['DIARIA', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.habitForm.invalid) return;

    this.salvando = true;
    this.habitService.createHabit(this.habitForm.value).subscribe({
      next: () => this.router.navigate(['/habits']),
      error: (err) => {
        console.error('Erro ao salvar hábito', err);
        this.salvando = false;
      }
    });
  }
}
