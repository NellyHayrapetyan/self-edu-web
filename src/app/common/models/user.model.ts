import { Role } from './roles.enum';


export interface User {
  email: string;
  password: string;
  role: Role;
}
