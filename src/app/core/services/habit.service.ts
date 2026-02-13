import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habit, HabitLog, CreateHabitPayload } from '../models/habit.model';
import {environment} from '../../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class HabitService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createHabit(payload: CreateHabitPayload): Observable<Habit> {
    return this.http.post<Habit>(`${this.apiUrl}/habits`, payload);
  }

  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(`${this.apiUrl}/habits`);
  }

  logHabit(habitId: string, value: number = 1): Observable<any> {
    return this.http.post(`${this.apiUrl}/habits/${habitId}/log`, { value });
  }

  getHabitLogs(habitId: string): Observable<HabitLog[]> {
    return this.http.get<HabitLog[]>(`${this.apiUrl}/habits/${habitId}/logs`);
  }

  // Adicione estes métodos dentro do seu HabitService
  getHabitById(id: string): Observable<Habit> {
    return this.http.get<Habit>(`${this.apiUrl}/${id}`);
  }

}
