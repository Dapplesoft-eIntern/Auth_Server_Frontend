



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UserStateService } from '../../../../../libs/user/user-state.service';
import { User } from '../../../../../libs/user/user.model';


@Component({
  selector: 'app-page-user',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PageUserComponent implements OnInit {

  users: User[] = [];
  selectedUser: User = {} as User;
  displayDialog: boolean = false;
  isEdit: boolean = false;

  constructor(
    private userState: UserStateService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.userState.users$.subscribe(data => this.users = data);
    this.userState.loadUsers();
  }

  openAddDialog() {
    this.selectedUser = {} as User;
    this.isEdit = false;
    this.displayDialog = true;
  }

  openEditDialog(user: User) {
    this.selectedUser = { ...user };
    this.isEdit = true;
    this.displayDialog = true;
  }

  saveUser() {
    if (this.isEdit) {
      this.userState.updateUser(this.selectedUser.id, this.selectedUser);
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'User updated successfully' });
    } else {
      this.userState.addUser(this.selectedUser);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'User added successfully' });
    }
    this.displayDialog = false;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.name}?`,
      accept: () => {
        this.userState.deleteUser(user.id);
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'User deleted successfully' });
      }
    });
  }

  cancelDialog() {
    this.displayDialog = false;
  }
}
