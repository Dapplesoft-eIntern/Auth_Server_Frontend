import { CommonModule } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { AlertService } from '../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../prime-modules'
import { Application, ApplicationDto } from '../../application.model'
import { ApplicationApiService } from '../../application-api.service'
import { ApplicationFormService } from '../../application-form.service'

@Component({
    selector: 'app-application-modal',
    imports: [CommonModule, PrimeModules, FormsModule, ReactiveFormsModule],
    templateUrl: './application-modal.component.html',
    styleUrl: './application-modal.component.css',
})
export class CreateApplicationModalComponent {
    protected applicationFormService = inject(ApplicationFormService)
    private applicationApiService = inject(ApplicationApiService)
    private alertService = inject(AlertService)
    private ref = inject(DynamicDialogRef)
    private config = inject(DynamicDialogConfig)

    isLoading = signal(false)
    isEditMode = signal(false)
    private applicationId?: string

    constructor() {
        this.initializeForm()
    }

    private initializeForm() {
        const application: Application | undefined =
            this.config.data?.application

        if (application) {
            this.isEditMode.set(true)
            this.applicationId = application.id
            this.applicationFormService.form.patchValue({
                name: application.name,
                clientId: application.clientId,
                clientSecret: application.clientSecret,
                redirectUri: application.redirectUri,
                apiBaseUrl: application.apiBaseUrl,
            })
        } else {
            this.isEditMode.set(false)
            this.applicationId = undefined
            this.applicationFormService.form.reset()
        }
    }

    submit(event: Event) {
        event.preventDefault()
        if (this.applicationFormService.form.invalid) return

        this.isLoading.set(true)
        const formValue = this.applicationFormService.getValue()

        const applicationData: ApplicationDto = {
            name: formValue.name!,
            redirectUri: formValue.redirectUri!,
            apiBaseUrl: formValue.apiBaseUrl!,
        }

        this.isEditMode()
            ? this.updateApplication(applicationData)
            : this.createApplication(applicationData)
    }

    private createApplication(application: ApplicationDto) {
        this.applicationApiService.createApplication(application).subscribe({
            next: (res) => {
                this.isLoading.set(false)
                this.ref.close(res)
                this.alertService.success('Project created successfully')
            },
            error: () => {
                this.isLoading.set(false)
                this.alertService.error('Failed to create project')
            },
        })
    }

    private updateApplication(application: ApplicationDto) {
        if (!this.applicationId) return

        this.applicationApiService
            .updateApplication(this.applicationId, application)
            .subscribe({
                next: (res) => {
                    this.isLoading.set(false)
                    this.ref.close(res)
                    this.alertService.success('Project updated successfully')
                },
                error: () => {
                    this.isLoading.set(false)
                    this.alertService.error('Failed to update project')
                },
            })
    }
}
