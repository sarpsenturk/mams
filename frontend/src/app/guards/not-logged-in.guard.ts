import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate() {
    if (!this.auth.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/home'])
      return false
    }
  }
}
