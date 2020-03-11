import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmptyComponent } from './empty/empty.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { NoContentComponent } from './no-content/no-content.component';
import { SubjectCreateModalComponent } from './modals/subject-create-modal/subject-create-modal.component';
import { Modals } from './modals';

export const Components = [
  TeacherDashboardComponent,
  DashboardComponent,
  EmptyComponent,
  StudentDashboardComponent,
  NoContentComponent,
  ...Modals,
];

export const EntryComponents = [
    ...Modals,
];
