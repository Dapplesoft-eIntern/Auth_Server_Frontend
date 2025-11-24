// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface RolePermission {
//   id: number;
//   role: string;
//   permission: string;
//   description: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class RolePermissionsApiService {
//   constructor(private http: HttpClient) {}

//   getRolePermissions(): Observable<RolePermission[]> {
//     return this.http.get<RolePermission[]>('/api/rolepermissions');
//   }

//   deleteRolePermission(id: number): Observable<any> {
//     return this.http.delete(`/api/rolepermissions/${id}`);
//   }

//   updateRolePermission(data: RolePermission): Observable<RolePermission> {
//     return this.http.put<RolePermission>(`/api/rolepermissions/${data.id}`, data);
//   }
// }
