import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Role } from './role.model'

@Injectable({
    providedIn: 'root',
})
export class RoleDataService {
    private roles: Role[] = [
        {
            id: 1,
            role_name: 'Admin',
            description: 'Full access to all features',
        },
        {
            id: 2,
            role_name: 'Manager',
            description: 'Manage team and resources',
        },
        { id: 3, role_name: 'Developer', description: 'Work on projects' },
        { id: 4, role_name: 'Viewer', description: 'Can view data' },
    ]

    constructor() {}

    loadRoles(): Observable<Role[]> {
        return of(this.roles)
    }

    getLocalRoles(): Role[] {
        return this.roles
    }

    addRole(role: Role) {
        const newId = this.roles.length
            ? Math.max(...this.roles.map((r) => r.id)) + 1
            : 1
        this.roles.push({ ...role, id: newId })
    }

    updateRoleLocal(id: number, role: Role) {
        const index = this.roles.findIndex((r) => r.id === id)
        if (index !== -1) this.roles[index] = { ...role, id }
    }

    deleteRole(id: number): Observable<boolean> {
        this.roles = this.roles.filter((r) => r.id !== id)
        return of(true)
    }
}
