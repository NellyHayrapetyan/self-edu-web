import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Role } from '../models/roles.enum';
import { User } from '../models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, public router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const roles = route.data.roles as Array<Role>;
    let access = null;
    if  (this.authenticationService.user) {
      access = isAllowedAccess(this.authenticationService.user, roles);
    }

    if (!access) {
      this.router.navigate(['']);
    }

    return Promise.resolve(access);
  }
}

const isAllowedAccess = (user: User, allowedRoles: Array<Role>): boolean => {
  return allowedRoles.indexOf(user.role) >= 0;
};
