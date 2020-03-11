import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../common/services/authentication.service';
import { Router } from '@angular/router';
import { SubjectService } from '../../common/services/subject.service';
import { MatDialog } from '@angular/material';
import { SubjectCreateModalComponent } from '../modals/subject-create-modal/subject-create-modal.component';

@Component({
  selector: 'teacher-dashboard',
  templateUrl: 'teacher-dashboard.component.html',
  styleUrls: ['teacher-dashboard.component.scss']
})

export class TeacherDashboardComponent implements OnInit {
  public user: any;
  public subjects: any;

  constructor(
    public dialog: MatDialog,
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
  }

  public async logOut() {
    await this.authenticationService.logout();
    await this.router.navigate(['dashboard']);
  }

  public createSubject() {
    const dialog = this.dialog.open(SubjectCreateModalComponent, {
      height: '300px',
      width: '600px',
    });

    dialog.afterClosed().subscribe(() => {
      this.getSubjects();
    });
  }
}
