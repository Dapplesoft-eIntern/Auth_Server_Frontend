import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';


@Component({
  selector: 'app-reusable-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, TooltipModule],
  templateUrl: './reusable-table.component.html',
})
export class ReusableTableComponent {
  @Input() columns: { field: string; header: string }[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onEdit(row: any) {
    this.edit.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }
}
