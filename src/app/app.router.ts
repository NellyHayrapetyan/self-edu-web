import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
import { RegistrationComponent } from './sing-up/registration.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: '',
    component: DashboardComponent,
  }
];
