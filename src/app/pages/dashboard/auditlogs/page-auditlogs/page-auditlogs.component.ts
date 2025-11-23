import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuditLog } from '../../../../../libs/auditlogs/auditlog.model';
import { AuditLogsService } from '../../../../../libs/auditlogs/auditlog-data.service';
import { SearchDateFilterComponent } from "../../../shared/components/search-date-filter.component";



@Component({
  selector: 'app-page-auditlogs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    SearchDateFilterComponent
],
  templateUrl: './page-auditlogs.component.html',
  providers: [MessageService, ConfirmationService]
})
export class PageAuditLogsRoutesComponent implements OnInit {

  fromDate!: string;
  toDate!: string;


  auditLogs: AuditLog[] = [];
  dialogVisible = false;
  editingLog: AuditLog = {} as AuditLog;
  isAddMode = false;

  constructor(
    private auditService: AuditLogsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadAuditLogs();
  }

  loadAuditLogs() {
    this.auditService.getAll().subscribe(data => this.auditLogs = data);
  }



  openEditDialog(log: AuditLog) {
    this.editingLog = { ...log };
    this.isAddMode = false;
    this.dialogVisible = true;
  }

  saveLog() {
    if (this.isAddMode) {
      this.auditService.create(this.editingLog).subscribe(log => {
        this.auditLogs.push(log);
        this.dialogVisible = false;
        this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Audit log added successfully' });
      });
    } else {
      this.auditService.update(this.editingLog.id, this.editingLog).subscribe(updated => {
        if (updated) {
          const index = this.auditLogs.findIndex(l => l.id === updated.id);
          this.auditLogs[index] = updated;
          this.dialogVisible = false;
          this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Audit log updated successfully' });
        }
      });
    }
  }

  deleteLog(log: AuditLog) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete this log?`,
      accept: () => {
        this.auditService.delete(log.id).subscribe(success => {
          if (success) {
            this.auditLogs = this.auditLogs.filter(l => l.id !== log.id);
            this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Audit log deleted successfully' });
          }
        });
      }
    });
  }
}






