import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { TooltipModule } from 'primeng/tooltip'

@Component({
    selector: 'app-reusable-table',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        TooltipModule,
    ],
    templateUrl: './reusable-table.component.html',
})
export class ReusableTableComponent {
    @Input() columns: { field: string; header: string }[] = []
    @Input() data: any[] = []
    @Input() loading = false

    @Output() edit = new EventEmitter<any>()
    @Output() delete = new EventEmitter<any>()

    onEdit(row: any) {
        this.edit.emit(row)
    }

    onDelete(row: any) {
        this.delete.emit(row)
    }
}
