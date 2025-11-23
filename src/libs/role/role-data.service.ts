import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role } from './role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roles: Role[] = [
    { id: 1, role_name: 'Admin', description: 'Full access to all features' },
    { id: 2, role_name: 'Manager', description: 'Manage team and resources' },
    { id: 3, role_name: 'Developer', description: 'Can work on projects and tasks' },
    { id: 4, role_name: 'Viewer', description: 'Can only view data' }
  ];

  getRoles(): Observable<Role[]> {
    return of(this.roles);
  }
}
