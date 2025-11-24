// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { RolePermissionsApiService, RolePermission } from './rolepermission-api.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class RolePermissionsDataService {
//   private _rolePermissions$ = new BehaviorSubject<RolePermission[]>([]);
//   private _loading$ = new BehaviorSubject<boolean>(false);

//   constructor(private api: RolePermissionsApiService) {}

//   get rolePermissions$(): Observable<RolePermission[]> {
//     return this._rolePermissions$.asObservable();
//   }

//   get loading$(): Observable<boolean> {
//     return this._loading$.asObservable();
//   }

//   fetchRolePermissions() {
//     this._loading$.next(true);
//     this.api.getRolePermissions()
//       .pipe(
//         tap(() => this._loading$.next(false))
//       )
//       .subscribe({
//         next: (data) => this._rolePermissions$.next(data),
//         error: () => this._loading$.next(false),
//       });
//   }

//   deleteRolePermission(id: number) {
//     return this.api.deleteRolePermission(id).pipe(
//       tap(() => {
//         const updated = this._rolePermissions$.value.filter(rp => rp.id !== id);
//         this._rolePermissions$.next(updated);
//       })
//     );
//   }
// }
