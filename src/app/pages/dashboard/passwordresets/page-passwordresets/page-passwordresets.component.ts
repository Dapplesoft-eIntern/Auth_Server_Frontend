import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PasswordDataService, PasswordReset } from '../../../../../libs/passwordresets/passwordreset-data.service';
import { SearchDateFilterComponent } from "../../../shared/components/search-date-filter.component";

@Component({
  selector: 'app-page-passwordresets',
  standalone: true,
  imports: [CommonModule,SearchDateFilterComponent, Toast,FormsModule,ConfirmDialogModule, TableModule, ButtonModule, DialogModule, InputTextModule, TagModule],
  templateUrl: './page-passwordresets.component.html',
  styleUrls: ['./page-passwordresets.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PagePasswordResetsComponent implements OnInit {
  resetTokens: PasswordReset[] = [];
  dialogVisible = false;
  editingToken: PasswordReset = {} as PasswordReset;
  isAddMode = false;

  constructor(
    private passwordService: PasswordDataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadTokens();
  }

  loadTokens() {
    this.passwordService.getAll().subscribe(data => this.resetTokens = data);
  }


  openEditDialog(token: PasswordReset) {
    this.editingToken = { ...token };
    this.isAddMode = false;
    this.dialogVisible = true;
  }

  saveToken() {
    if (this.isAddMode) {
      this.passwordService.create(this.editingToken).subscribe(() => {
        this.loadTokens();
        this.dialogVisible = false;
        this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Password token added successfully' });
      });
    } else {
      this.passwordService.update(this.editingToken.id, this.editingToken).subscribe(() => {
        this.loadTokens();
        this.dialogVisible = false;
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Password token updated successfully' });
      });
    }
  }

  deleteToken(token: PasswordReset) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete the token for ${token.user_name}?`,
      accept: () => {
        this.passwordService.delete(token.id).subscribe(() => {
          this.loadTokens();
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Password token deleted successfully' });
        });
      }
    });
  }
}
