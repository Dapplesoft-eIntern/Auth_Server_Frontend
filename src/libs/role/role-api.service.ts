import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Role } from './role.model'

@Injectable({
    providedIn: 'root',
})
export class RoleApiService {
    constructor() {}

    getRoles(): Observable<Role[]> {
        throw new Error('API not implemented')
    }

    deleteRole(id: number): Observable<boolean> {
        throw new Error('API not implemented')
    }
}
