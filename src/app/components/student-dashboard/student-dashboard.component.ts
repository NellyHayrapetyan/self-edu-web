import { Component } from '@angular/core';
import { AuthenticationService } from '../../common/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'student-dashboard',
  templateUrl: 'student-dashboard.component.html',
  styleUrls: ['student-dashboard.component.scss']
})

export class StudentDashboardComponent {

  constructor(
    private authenticationService: AuthenticationService,
    private router:  Router,
  ) {
  }

  public async logOut() {
    await this.authenticationService.logout();
    await this.router.navigate(['dashboard']);
  }

}
