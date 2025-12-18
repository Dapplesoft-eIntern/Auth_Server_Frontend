import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { DialogService } from 'primeng/dynamicdialog'
import { AlertService } from '../../../common-service/lib/alert.service'
import { PrimeModules } from '../../../prime-modules'
import { Application } from '../../application.model'
import { ApplicationListStateService } from '../../application-state.service'
import { ApplicationModalComponent } from '../application-modal/application-modal.component'

@Component({
    selector: 'app-application-table',
    imports: [CommonModule, PrimeModules],
    templateUrl: './application-table.component.html',
    styleUrl: './application-table.component.css',
})
export class ApplicationTableComponent {
    protected applicationListStateService = inject(ApplicationListStateService)
    private dialogService = inject(DialogService)
    private alertService = inject(AlertService)

    addApplication() {
        const ref = this.dialogService.open(ApplicationModalComponent, {
            header: 'Add project',
            width: '50%',
            closable: true,
        })

        ref?.onClose.subscribe((application) => {
            if (application) {
                this.applicationListStateService.init()
            }
        })
    }

    editApplication(application: Application) {
        const ref = this.dialogService.open(ApplicationModalComponent, {
            header: 'Edit project',
            width: '50%',
            closable: true,
            data: { application },
        })

        ref?.onClose.subscribe((updatedApplication) => {
            if (updatedApplication) {
                this.applicationListStateService.init()
            }
        })
    }

    confirmDelete(application: Application) {
        this.applicationListStateService
            .deleteApplication(application.id)
            .subscribe({
                next: () => {
                    this.alertService.success(
                        'Application deleted successfully',
                    )
                },
                error: () => {
                    this.alertService.error('Failed to delete application')
                },
            })
    }
}
