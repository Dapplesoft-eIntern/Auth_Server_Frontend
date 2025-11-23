// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { RolePermission } from './rolepermission.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class RolePermissionsService {
//   private rolePermissions: RolePermission[] = [];

//   constructor() {}

//   getRolePermissions(): Observable<RolePermission[]> {
//     return of(this.rolePermissions);
//   }

//   saveRolePermissions(data: RolePermission[]): Observable<void> {
//     // Replace existing permissions for the role
//     const roleId = data[0]?.role_id;
//     if (roleId != null) {
//       this.rolePermissions = this.rolePermissions.filter(rp => rp.role_id !== roleId).concat(data);
//     }
//     return of();
//   }

//   deleteRolePermissions(roleId: number): Observable<void> {
//     this.rolePermissions = this.rolePermissions.filter(rp => rp.role_id !== roleId);
//     return of();
//   }
// }
