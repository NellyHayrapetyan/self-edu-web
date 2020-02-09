import { Component } from '@angular/core';
import { AuthenticationService } from '../../common/services/authentication.service';

@Component({
  selector: 'teacher-dashboard',
  templateUrl: 'teacher-dashboard.component.html',
  styleUrls: ['teacher-dashboard.component.scss']
})

export class TeacherDashboardComponent {

  constructor(private authenticationService: AuthenticationService) {
  }

  yo() {
    this.authenticationService.test();
  }

}
