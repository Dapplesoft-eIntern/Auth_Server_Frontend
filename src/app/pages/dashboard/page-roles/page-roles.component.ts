import { CommonModule } from '@angular/common'
import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { Role } from '../../../../libs/role/role.model'
import { RoleApiService } from '../../../../libs/role/role-api.service'

@Component({
    selector: 'app-page-roles',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        ToastModule,
        FormsModule,
    ],
    templateUrl: './page-roles.component.html',
    providers: [MessageService],
})
export class PageRolesComponent implements OnInit {
    roles: Role[] = []
    displayDialog = false
    selectedRole: Role | null = null
    roleForm = { role_name: '', description: '' }

    constructor(
        private roleApi: RoleApiService,
        private messageService: MessageService,
        private cd: ChangeDetectorRef, // inject ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.loadRoles()
    }

    loadRoles() {
        this.roleApi.getRoles().subscribe({
            next: (data) => {
                this.roles = data
                this.cd.detectChanges() // trigger change detection manually
            },
            error: () => this.showError('Failed to load roles'),
        })
    }

    openAddDialog() {
        this.selectedRole = null
        this.roleForm = { role_name: '', description: '' }
        this.displayDialog = true
    }

    openEditDialog(role: Role) {
        this.selectedRole = role
        this.roleForm = {
            role_name: role.role_name,
            description: role.description,
        }
        this.displayDialog = true
    }

    cancelDialog() {
        this.displayDialog = false
    }

    saveRole() {
        if (this.selectedRole) {
            this.roleApi.update(this.selectedRole.id, this.roleForm).subscribe({
                next: () => {
                    this.showSuccess(`Role ID ${this.selectedRole!.id} updated`)
                    this.loadRoles()
                    this.displayDialog = false
                },
                error: () => this.showError('Update failed'),
            })
        } else {
            this.roleApi.create(this.roleForm).subscribe({
                next: () => {
                    this.showSuccess('Role added successfully')
                    this.loadRoles()
                    this.displayDialog = false
                },
                error: () => this.showError('Create failed'),
            })
        }
    }

    deleteRole(role: Role) {
        if (!confirm(`Delete role ID ${role.id}?`)) return

        this.roleApi.deleteRole(role.id).subscribe({
            next: () => {
                this.showSuccess(`Role ID ${role.id} deleted`)
                this.loadRoles()
            },
            error: () => this.showError('Delete failed'),
        })
    }

    showSuccess(detail: string) {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail,
        })
    }

    showError(detail: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail })
    }
}
