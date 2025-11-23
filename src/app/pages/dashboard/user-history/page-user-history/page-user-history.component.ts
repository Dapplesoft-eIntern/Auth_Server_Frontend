import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserHistory } from '../../../../../libs/user-history/user-history.model';
import { UserHistoryService } from '../../../../../libs/user-history/user-history-data.service';
import { SearchDateFilterComponent } from "../../../shared/components/search-date-filter.component";

@Component({
  selector: 'app-page-user-history',
  standalone: true,
  imports: [CommonModule,SearchDateFilterComponent, FormsModule,ConfirmDialogModule, TableModule, DialogModule, ButtonModule],
  templateUrl: './page-user-history.component.html'
})
export class PageUserHistoryComponent implements OnInit {
  history: UserHistory[] = [];
  editFormVisible = false;
  editingItem: UserHistory = {} as UserHistory;

  constructor(private historyService: UserHistoryService) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.historyService.getAll().subscribe(data => this.history = data);
  }

  deleteHistory(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.historyService.delete(id).subscribe(() => this.loadHistory());
    }
  }

  openEditForm(item: UserHistory) {
    this.editingItem = { ...item };
    this.editFormVisible = true;
  }

  updateHistory() {
    this.historyService.update(this.editingItem.id, this.editingItem).subscribe(() => {
      this.loadHistory();
      this.editFormVisible = false;
    });
  }

  cancelEdit() {
    this.editFormVisible = false;
  }
}
