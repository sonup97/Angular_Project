import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthRouteGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn && this.authService.role === "admin") {
      return true;
    }
    this.router.navigate(['/login/admin']);
    return false;
  }
}
