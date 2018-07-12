import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private service: LoginService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.service.isLoggedIn) {
      return true;
    } else {
      // Check for localStorage and ensure the encrypted data is proper
      const code = localStorage.getItem('sessionId');
      if (code) {
        return this.service.checkLoggedInUser(code).then(response => {
          if (response) {
            return Promise.resolve(true);
          } else {
            this.router.navigate(['/Login']);
            return Promise.resolve(false);
          }
        });
      } else {
        this.router.navigate(['/Login']);
        return false;
      }
    }
  }
}
