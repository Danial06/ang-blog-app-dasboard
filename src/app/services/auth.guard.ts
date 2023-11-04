import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})

export class ProductGuardService implements CanActivate {

  constructor(private router: Router, private auth: AuthService, private notify: NotifyService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.auth.isLoggedInGuard) {
      return true;
    } else {

      this.router.navigate(["/login"]);
      this.notify.showWarning('Please login', 'LOL')
      return false;
    }

  }
}