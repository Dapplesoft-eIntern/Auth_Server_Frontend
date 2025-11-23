// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { Permission } from './permission.model';
// import { RolePermission } from './rolepermission.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class RolePermissionService {

//   private roles: Role[] = [
//     { id: 1, name: 'Admin' },
//     { id: 2, name: 'Manager' },
//     { id: 3, name: 'Employee' },
//   ];

//   private permissions: Permission[] = [
//     { id: 1, code: 'CAN_VIEW_REPORT', description: 'View Reports' },
//     { id: 2, code: 'CAN_DELETE_USER', description: 'Delete Users' },
//     { id: 3, code: 'CAN_EDIT_PRODUCT', description: 'Edit Product' },
//     { id: 4, code: 'CAN_ADD_PRODUCT', description: 'Add Product' },
//   ];

//   private rolePermissions: RolePermission[] = [
//     { role_id: 1, permission_ids: [1,2,3,4] },  
//     { role_id: 2, permission_ids: [1,3,4] },   
//     { role_id: 3, permission_ids: [1,3] },      
//   ];

//   constructor() {}

//   getRoles(): Observable<Role[]> {
//     return of(this.roles);
//   }

//   getPermissions(): Observable<Permission[]> {
//     return of(this.permissions);
//   }

//   getRolePermissions(role_id: number): Observable<RolePermission | undefined> {
//     const rp = this.rolePermissions.find(r => r.role_id === role_id);
//     return of(rp);
//   }

//   saveRolePermissions(role_id: number, permission_ids: number[]): Observable<RolePermission> {
//     const existingIndex = this.rolePermissions.findIndex(r => r.role_id === role_id);
//     const newData: RolePermission = { role_id, permission_ids };

//     if (existingIndex !== -1) {
//       this.rolePermissions[existingIndex] = newData;
//     } else {
//       this.rolePermissions.push(newData);
//     }

//     return of(newData);
//   }
// }
