// role-permission-data.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RolePermission } from './rolepermission.model';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {

  private rolePermissions: RolePermission[] = [
    { role_id: 1, permission_id: 1 },
    { role_id: 1, permission_id: 2 },
    { role_id: 2, permission_id: 1 },
    { role_id: 3, permission_id: 3 },
  ];

  constructor() {}

  // Get all role-permission relationships
  getRolePermissions(): Observable<RolePermission[]> {
    return of(this.rolePermissions);
  }

  // Get permissions for a specific role
  getPermissionsByRole(role_id: number): Observable<RolePermission[]> {
    const filtered = this.rolePermissions.filter(rp => rp.role_id === role_id);
    return of(filtered);
  }

  // Add a new role-permission link
  addRolePermission(rolePermission: RolePermission): Observable<void> {
    this.rolePermissions.push(rolePermission);
    return of();
  }

  // Delete a role-permission link
  deleteRolePermission(role_id: number, permission_id: number): Observable<void> {
    this.rolePermissions = this.rolePermissions.filter(
      rp => !(rp.role_id === role_id && rp.permission_id === permission_id)
    );
    return of();
  }

  // Replace all permissions for a role (useful for save/update from form)
  setRolePermissions(role_id: number, permission_ids: number[]): Observable<void> {
    // Remove existing permissions for this role
    this.rolePermissions = this.rolePermissions.filter(rp => rp.role_id !== role_id);

    // Add new permissions
    permission_ids.forEach(pid => {
      this.rolePermissions.push({ role_id, permission_id: pid });
    });

    return of();
  }
}
