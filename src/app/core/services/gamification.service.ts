import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserMana } from '../models/user.model';
import { Challenge, Reward } from '../models/challenge.model';
import { LeaderboardEntry } from '../models/leaderboard.model';
import {environment} from '../../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class GamificationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getManaBalance(): Observable<UserMana> {
    return this.http.get<UserMana>(`${this.apiUrl}/mana/balance`);
  }

  redeemReward(rewardId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/mana/redeem`, { reward_id: rewardId });
  }

  getChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(`${this.apiUrl}/challenges`);
  }
  getRewards(): Observable<Reward[]> {
    return this.http.get<Reward[]>(`${this.apiUrl}/rewards`);
  }
  getLeaderboard(): Observable<LeaderboardEntry[]> {
    return this.http.get<LeaderboardEntry[]>(`${this.apiUrl}/leaderboard`);
  }
}
