import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { Observable } from 'rxjs'
import { ApplicationApiService } from '../../../../libs/applicatiaons'
import { Application } from '../../../../libs/applicatiaons/application.model'

@Component({
    selector: 'app-page-applications',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        ToastModule,
    ],
    templateUrl: './page-applications.component.html',
    providers: [MessageService],
})
export class PageApplicationsComponent implements OnInit {
    applications$!: Observable<Application[]> // async observable for table
    projectForm: FormGroup
    showForm = false
    editingApp: Application | null = null

    statusOptions = [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
    ]

    constructor(
        private fb: FormBuilder,
        private appService: ApplicationApiService,
        private messageService: MessageService,
    ) {
        this.projectForm = this.fb.group({
            name: [''],
            client_id: [''],
            client_secret: [''],
            redirect_uri: [''],
            api_base_url: [''],
            status: ['active'],
        })
    }

    ngOnInit(): void {
        this.loadApplications()
    }

    loadApplications() {
        this.applications$ = this.appService.getAll()
    }

    openForm(app: Application | null = null) {
        this.editingApp = app
        if (app) {
            this.projectForm.patchValue(app)
        } else {
            this.projectForm.reset({ status: 'active' })
        }
        this.showForm = true
    }

    closeForm() {
        this.showForm = false
        this.editingApp = null
    }

    saveProject() {
        const formValue = this.projectForm.value

        if (this.editingApp) {
            this.appService.update(this.editingApp.id, formValue).subscribe({
                next: (updated: Application) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Updated',
                        detail: `Project "${updated.name}" updated`,
                    })
                    this.loadApplications()
                    this.closeForm()
                },
                error: (err: any) => console.error(err),
            })
        } else {
            this.appService.create(formValue).subscribe({
                next: (created: Application) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Added',
                        detail: `Project "${created.name}" added`,
                    })
                    this.loadApplications()
                    this.closeForm()
                },
                error: (err: any) => console.error(err),
            })
        }
    }

    deleteProject(app: Application) {
        if (confirm(`Are you sure you want to delete project "${app.name}"?`)) {
            this.appService.delete(app.id).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Deleted',
                        detail: `Project "${app.name}" deleted`,
                    })
                    this.loadApplications()
                },
                error: (err: any) => console.error(err),
            })
        }
    }
}
