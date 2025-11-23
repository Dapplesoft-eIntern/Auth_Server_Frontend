import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MemberService } from '../../../../../libs/businesses-member/member-data.service';
import { BusinessMember } from '../../../../../libs/businesses-member/member.model';
import { SearchDateFilterComponent } from "../../../shared/components/search-date-filter.component";

@Component({
  selector: 'app-page-member',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TagModule,
    ToastModule,
    SearchDateFilterComponent,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './page-member.component.html',
  styleUrls: ['./page-member.component.css']
})
export class PageMemberComponent implements OnInit {
  members: BusinessMember[] = [];
  dialogVisible = false;
  editingMember: BusinessMember = {} as BusinessMember;
  isAddMode = false;

  roles = ['Admin', 'Manager', 'User'];

  constructor(
    private memberService: MemberService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers().subscribe(data => this.members = data);
  }

  openAddDialog() {
    this.editingMember = {} as BusinessMember;
    this.isAddMode = true;
    this.dialogVisible = true;
  }

  openEditDialog(member: BusinessMember) {
    this.editingMember = { ...member };
    this.isAddMode = false;
    this.dialogVisible = true;
  }

  saveMember() {
    if (this.isAddMode) {
      this.memberService.create(this.editingMember).subscribe(() => {
        this.loadMembers();
        this.dialogVisible = false;
        this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Member added successfully' });
      });
    } else {
      this.memberService.update(this.editingMember.id, this.editingMember).subscribe(() => {
        this.loadMembers();
        this.dialogVisible = false;
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Member updated successfully' });
      });
    }
  }


  deleteMember(member: BusinessMember) {
    if (confirm(`Are you sure you want to delete member ID ${member.id}?`)) {
      this.memberService.delete(member.id);

      this.members = this.members.filter(m => m.id !== member.id);
    }
  }

}
