import { PageByRoleGuard } from './page-by-role.guard';
import { RolesGuard } from './roles.guard';

export const Guards  = [
  PageByRoleGuard,
  RolesGuard,
];
