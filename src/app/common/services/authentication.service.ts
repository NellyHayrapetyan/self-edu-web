import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  private currentUser: User = null;

  constructor(
    private http: HttpClient,
  ) {
  }

  public fetchUser() {
    return this.http.get<any>(`${environment.api}/users/profile`);
  }

  public login(username, password) {
    return this.http.post(`${environment.api}/auth/signin`, { username, password })
      .pipe(
        map((user: any) => {
          if (user && user.accessToken) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      ).toPromise();
  }

  public logout() {
    localStorage.removeItem('user');
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
}
