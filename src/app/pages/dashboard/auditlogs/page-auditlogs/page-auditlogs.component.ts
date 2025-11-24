



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
import { AuditStateService } from '../../../../../libs/auditlogs/auditlog-state.service';

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
  ],
  templateUrl: './page-auditlogs.component.html',
  providers: [MessageService, ConfirmationService]
})
export class PageAuditLogsRoutesComponent implements OnInit {

  auditLogs: AuditLog[] = [];
  dialogVisible = false;
  editingLog: AuditLog = {} as AuditLog;
  isAddMode = false;

  constructor(
    private auditState: AuditStateService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.auditState.logs$.subscribe(data => this.auditLogs = data);
    this.auditState.loadLogs();
  }

  openAddDialog() {
    this.editingLog = { id: 0, user_name: '', business_name: '', action: '', description: '', created_at: '' };
    this.isAddMode = true;
    this.dialogVisible = true;
  }

  openEditDialog(log: AuditLog) {
    this.editingLog = { ...log };
    this.isAddMode = false;
    this.dialogVisible = true;
  }

  saveLog() {
    if (this.isAddMode) {
      this.auditState.addLog(this.editingLog);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Audit log added successfully' });
    } else {
      this.auditState.updateLog(this.editingLog.id, this.editingLog);
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Audit log updated successfully' });
    }
    this.dialogVisible = false;
  }

  deleteLog(log: AuditLog) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete this log?`,
      accept: () => {
        this.auditState.deleteLog(log.id);
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Audit log deleted successfully' });
      }
    });
  }
}
