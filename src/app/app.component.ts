import { AsyncPipe, CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ConfirmDialog } from 'primeng/confirmdialog'
import { ConfirmPopup } from 'primeng/confirmpopup'
import { FormsModule } from '@angular/forms';

import {
    LayoutDashboardComponent,
    LayoutPublicComponent,
    PageLayout,
    PageLayoutService,
} from '../libs/common-components'
import { NgxSonnerToaster } from 'ngx-sonner'

@Component({
    selector: 'app-root',
    standalone: true, 
    imports: [
        CommonModule,
        FormsModule,       
        RouterOutlet,
        AsyncPipe,
        LayoutPublicComponent,
        LayoutDashboardComponent,
        ConfirmDialog,
        NgxSonnerToaster,
        ConfirmPopup,
    ],
    templateUrl: './app.component.html',
})
export class AppComponent {
    readonly PageLayout = PageLayout
    protected layoutService = inject(PageLayoutService)
}
