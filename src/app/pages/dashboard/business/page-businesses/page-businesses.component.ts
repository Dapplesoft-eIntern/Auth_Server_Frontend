import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BusinessService } from '../../../../../libs/businesses/business-data.service';
import { Business } from '../../../../../libs/businesses/businesses.model';

import { SearchDateFilterComponent } from '../../../shared/components/search-date-filter.component';

@Component({
  selector: 'app-page-businesses',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmDialogModule, TableModule, SearchDateFilterComponent, PaginatorModule, ToastModule, ButtonModule, DialogModule, InputTextModule],
  templateUrl: './page-businesses.component.html',
  styleUrls: ['./page-businesses.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PageBusinessesComponent implements OnInit {
  businesses: Business[] = [];
  dialogVisible = false;
  editingBusiness: Business = {} as Business;
  isAddMode = false;

  constructor(
    private businessService: BusinessService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadBusinesses();
  }

  loadBusinesses() {
    this.businessService.getBusinesses().subscribe(data => this.businesses = data);
  }

  openAddDialog() {
    this.editingBusiness = { id: 0, owner_user: '', business_name: '', industry_type: '', status: 'active', created_at: '' };
    this.isAddMode = true;
    this.dialogVisible = true;
  }

  openEditDialog(business: Business) {
    this.editingBusiness = { ...business };
    this.isAddMode = false;
    this.dialogVisible = true;
  }

  saveBusiness() {
    if (this.isAddMode) {
      this.businessService.create(this.editingBusiness).subscribe(() => {
        this.loadBusinesses();
        this.dialogVisible = false;
        this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Business added successfully' });
      });
    } else {
      this.businessService.update(this.editingBusiness.id, this.editingBusiness).subscribe(() => {
        this.loadBusinesses();
        this.dialogVisible = false;
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Business updated successfully' });
      });
    }
  }

  deleteBusiness(business: Business) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${business.business_name}?`,
      accept: () => {
        this.businessService.delete(business.id).subscribe(() => {
          this.loadBusinesses();
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Business deleted successfully' });
        });
      }
    });
  }
}
