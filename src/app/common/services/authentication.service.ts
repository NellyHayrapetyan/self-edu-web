import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';
import { JwtInterceptor } from './interceptor.service';

@Injectable()
export class AuthenticationService {

  private currentUser: User = null;

  constructor(
    private http: HttpClient,
    private ngxPermissionsService: NgxPermissionsService,
  ) {
  }

  public fetchUser() {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).user;
    }
    return null;
  }

  public login(email, password) {
    return this.http.post(`${environment.api}/auth/signin`, { email, password })
      .pipe(
        map((user: any) => {
          this.currentUser = user;
          this.ngxPermissionsService.flushPermissions();
          this.ngxPermissionsService.loadPermissions([this.currentUser.role]);
          if (user && user.accessToken) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      ).toPromise();
  }

  public logout() {
    localStorage.removeItem('currentUser');
    return this.http.get(`${environment.api}/auth/logout`)
      .toPromise()
      .then(() => this.invalidateUser())
      .catch(e => console.log(e));
  }

  public invalidateUser() {
    this.currentUser = null;
  }

  public test() {
    return this.http.post(`${environment.api}/auth/test`, {})
      .toPromise();
  }

  public createUser(data) {
    return this.http.post(`${environment.api}/auth/create-user`, data)
      .toPromise();
  }

  public signUp(data) {
    return this.http.post(`${environment.api}/auth/signup`, data)
      .toPromise();
  }

  public get user(): User {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).user;
    }
    return null;
  }
}
