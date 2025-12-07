import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { map, Observable } from 'rxjs'
import { AuditApiService, AuditLog } from '../../../../libs/auditlogs'

@Component({
    selector: 'app-page-auditlogs',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        ToastModule,
        DialogModule,
    ],
    templateUrl: './page-auditlogs.component.html',
    providers: [MessageService],
})
export class PageAuditLogsComponent implements OnInit {
    auditLogs$!: Observable<AuditLog[]> // Observable for async table
    logForm: FormGroup
    showDialog = false
    editingLog: AuditLog | null = null

    constructor(
        private fb: FormBuilder,
        private auditService: AuditApiService,
        private messageService: MessageService,
    ) {
        this.logForm = this.fb.group({
            user_name: [''],
            business_name: [''],
            action: [''],
            description: [''],
        })
    }

    ngOnInit(): void {
        this.loadLogs()
    }

    loadLogs() {
        this.auditLogs$ = this.auditService.getAll().pipe(
            map((logs) => logs || []), // ensures table always gets an array
        )
    }

    openForm(log: AuditLog | null = null) {
        this.editingLog = log
        if (log) {
            this.logForm.patchValue(log)
        } else {
            this.logForm.reset()
        }
        this.showDialog = true
    }

    closeForm() {
        this.showDialog = false
        this.editingLog = null
    }

    saveLog() {
        const data = this.logForm.value
        if (this.editingLog) {
            this.auditService.update(this.editingLog.id, data).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Updated',
                        detail: 'Audit log updated',
                    })
                    this.loadLogs()
                },
            })
        } else {
            this.auditService.create(data).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Added',
                        detail: 'Audit log added',
                    })
                    this.loadLogs()
                },
            })
        }
        this.closeForm()
    }

    deleteLog(log: AuditLog) {
        if (confirm('Are you sure you want to delete this log?')) {
            this.auditService.delete(log.id).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Deleted',
                        detail: 'Audit log deleted',
                    })
                    this.loadLogs()
                },
            })
        }
    }
}
