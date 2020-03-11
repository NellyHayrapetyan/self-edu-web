import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../common/services/authentication.service';
import { Router } from '@angular/router';
import { SubjectService } from '../../common/services/subject.service';

@Component({
  selector: 'student-dashboard',
  templateUrl: 'student-dashboard.component.html',
  styleUrls: ['student-dashboard.component.scss']
})

export class StudentDashboardComponent implements OnInit {
  public user: any;
  public subjects: any;

  constructor(
    private authenticationService: AuthenticationService,
    private subjectService: SubjectService,
    private router: Router,
  ) {
  }

  async ngOnInit() {
    this.user = this.authenticationService.user;
    await this.getSubjects();
  }

  public async getSubjects()  {
    this.subjects = await this.subjectService.getSubjects();
    console.log(this.subjects);
  }

  public async logOut() {
    await this.authenticationService.logout();
    await this.router.navigate(['dashboard']);
  }

}
