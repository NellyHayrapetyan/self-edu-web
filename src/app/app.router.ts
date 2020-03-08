import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
import { RegistrationComponent } from './sing-up/registration.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmptyComponent } from './components/empty/empty.component';
import { PageByRoleGuard } from './common/guards/page-by-role.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { NoContentComponent } from './components/no-content/no-content.component';

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
    canActivate: [PageByRoleGuard],
  },
  {
    path: 'dashboard',
    component: EmptyComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [PageByRoleGuard],
      },
      {
        path: 'teacher',
        component: TeacherDashboardComponent,
        canActivate: [RolesGuard],
        data: {
          roles: ['teacher']
        },
      },
      {
        path: 'student',
        component: StudentDashboardComponent,
        canActivate: [RolesGuard],
        data: {
          roles: ['student']
        },
      },
    ],
  },
  {
    path: 'no-content',
    component: NoContentComponent,
  },
  {
    path: '**',
    redirectTo: '/no-content'
  }
];
