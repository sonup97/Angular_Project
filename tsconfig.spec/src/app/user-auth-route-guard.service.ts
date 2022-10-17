import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthRouteGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn && this.authService.role === "user") {
      return true;
    }
    this.router.navigate(['/login/user']);
    return false;
  }
}
