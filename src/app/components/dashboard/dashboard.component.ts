import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls:  ['dashboard.component.scss'],
})

export class DashboardComponent {

  constructor(private router: Router) {}

  public navigateToRegistration() {
    this.router.navigate(['registration']);
  }

  public navigateToLogin() {
    this.router.navigate(['login']);
  }

}
