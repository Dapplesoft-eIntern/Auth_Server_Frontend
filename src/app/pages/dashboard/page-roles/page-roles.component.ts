import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { PaginatorModule } from 'primeng/paginator'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { RoleTableComponent } from '../../../../libs/role/components/role-table/role-table.component'
import { RoleStateService } from '../../../../libs/role/role-state.service'

@Component({
    selector: 'app-page-todo',
    imports: [
        CommonModule,
        TableModule,
        PaginatorModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        FormsModule,
        ToastModule,
        IconFieldModule,
        InputIconModule,
        RoleTableComponent,
    ],
    templateUrl: './page-roles.component.html',
    styleUrl: './page-roles.component.css',
    providers: [MessageService, ConfirmationService],
})
export class PageRolesComponent implements OnInit {
    constructor(private roleState: RoleStateService) {}

    ngOnInit(): void {
        this.roleState.loadRoles()
    }
}
