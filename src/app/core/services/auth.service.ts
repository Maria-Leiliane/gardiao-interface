import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthPayload, AuthResponse } from '../models/user.model';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'guardiao_token';


  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  register(payload: AuthPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, payload).pipe(
      tap(res => this.setToken(res.token))
    );
  }

  login(payload: AuthPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, payload).pipe(
      tap(res => this.setToken(res.token))
    );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
    }
    this.loggedIn.next(false);
    this.router.navigate(['/login']); // Corrigido para a rota exata do app.routes.ts
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, token);
    }
    this.loggedIn.next(true);
  }

  private isBrowser(): boolean {

    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
