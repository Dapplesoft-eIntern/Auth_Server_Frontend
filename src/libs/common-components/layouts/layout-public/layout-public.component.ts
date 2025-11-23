import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { PublicFooterComponent } from '../../footer/public-footer/public-footer.component'
import { PublicHeaderComponent } from '../../header/public-header/public-header.component'

@Component({
    selector: 'app-layout-public',
    imports: [CommonModule, PublicFooterComponent, PublicHeaderComponent],
    templateUrl: './layout-public.component.html',
    styleUrl: './layout-public.component.css',
})
export class LayoutPublicComponent {}
