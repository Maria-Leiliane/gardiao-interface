import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { GamificationService } from '../../../core/services/gamification.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  manaBalance = 0;
  menuOpen = false;

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private gamificationService: GamificationService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.loadUserData();
      }
    });
  }

  loadUserData(): void {
    this.userService.getProfile().subscribe(user => this.user = user);
    this.gamificationService.getManaBalance().subscribe(mana => this.manaBalance = mana.balance);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.logout();
  }
}
