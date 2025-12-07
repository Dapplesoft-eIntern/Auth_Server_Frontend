import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Role } from './role.model'
import { RoleDataService } from './role-data.service'

@Injectable({
    providedIn: 'root',
})
export class RoleStateService {
    private rolesSubject = new BehaviorSubject<Role[]>([])
    roles$ = this.rolesSubject.asObservable()

    constructor(private data: RoleDataService) {}

    loadRoles() {
        this.data.loadRoles().subscribe((roles: Role[]) => {
            this.rolesSubject.next(roles)
        })
    }

    deleteRole(id: number) {
        this.data.deleteRole(id).subscribe(() => {
            const current = this.rolesSubject.value
            const updated = current.filter((r) => r.id !== id)
            this.rolesSubject.next(updated)
        })
    }
}
