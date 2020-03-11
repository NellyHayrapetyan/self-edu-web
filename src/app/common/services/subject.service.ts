import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class SubjectService {
  public static Url = `${environment.api}/subject`;
  constructor(private http: HttpClient) {}

  public getSubjects() {
    return this.http.get(`${SubjectService.Url}/all`)
      .toPromise();
  }

  public createSubject(subject) {
    return this.http.post(`${SubjectService.Url}/create`, subject)
      .toPromise();
  }
}
