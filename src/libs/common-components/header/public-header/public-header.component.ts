import { CommonModule } from '@angular/common'
import { Component, signal } from '@angular/core'
import { DATA } from '../../../../assets/data/data'
import { HEADER_DATA, HeaderData } from '../header.data'
import { RouterModule } from '@angular/router'
import { PrimeModules } from '../../../prime-modules'

@Component({
    selector: 'app-public-header',
    imports: [CommonModule, RouterModule, PrimeModules],
    templateUrl: './public-header.component.html',
    styleUrl: './public-header.component.css',
})
export class PublicHeaderComponent {
    protected data = DATA
    headerData = signal<HeaderData[]>(HEADER_DATA)
}
