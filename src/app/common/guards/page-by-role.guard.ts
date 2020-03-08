import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class PageByRoleGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkRoute(state);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkRoute(state);
  }

  private checkRoute(state: RouterStateSnapshot): boolean {
    let path = '';

    if (!this.authenticationService.user) {
      path = 'dashboard';
      return true;
    }

    if (this.authenticationService.user) {
      switch (this.authenticationService.user.role) {
        case 'teacher':
          path = 'dashboard/teacher';
          break;
        case 'student':
          path = 'dashboard/student';
          break;
        default:
          this.router.navigate(['/', 'no-content']);
          return false;
      }
    }

    console.log(path);
    if (state.url.startsWith(path)) {
      return true;
    }

    console.log(path);
    this.router.navigate([path]);
    return false;
  }
}
