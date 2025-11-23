import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../../libs/user/user-data.service';
import { MessageService } from 'primeng/api';
import { SearchDateFilterComponent } from "../../../shared/components/search-date-filter.component";

@Component({
  selector: 'app-page-user',
  standalone: true,
  imports: [
    CommonModule,SearchDateFilterComponent, TableModule, PaginatorModule, ButtonModule, ToastModule,
    DialogModule, InputTextModule, FormsModule
  ],
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.css'],
  providers: [MessageService]
})
export class PageUserComponent implements OnInit {

  users: any[] = [];
  selectedUser: any = {};
  displayDialog: boolean = false;
  isEdit: boolean = false;

  constructor(private userService: UserService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe(data => this.users = data);
  }


  openAddDialog() {
    this.selectedUser = {};
    this.isEdit = false;
    this.displayDialog = true;
  }


  openEditDialog(user: any) {
    this.selectedUser = { ...user };
    this.isEdit = true;
    this.displayDialog = true;
  }


  saveUser() {
    if(this.isEdit) {
      this.userService.update(this.selectedUser.id, this.selectedUser).subscribe(() => {
        const index = this.users.findIndex(u => u.id === this.selectedUser.id);
        if(index > -1) this.users[index] = { ...this.selectedUser };
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'User updated successfully' });
        this.displayDialog = false;
      });
    } else {
      const newId = Math.max(...this.users.map(u => u.id)) + 1;
      const newUser = { ...this.selectedUser, id: newId };
      this.users.push(newUser);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'User added successfully' });
      this.displayDialog = false;
    }
  }

  deleteUser(user: any) {
     {
      this.userService.delete(user.id).subscribe(() => {
        this.users = this.users.filter(u => u.id !== user.id);
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'User deleted successfully' });
      });
    }
  }


  cancelDialog() {
    this.displayDialog = false;
  }

}
