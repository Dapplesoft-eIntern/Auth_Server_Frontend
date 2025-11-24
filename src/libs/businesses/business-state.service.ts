import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Business } from './businesses.model';
import { BusinessDataService } from './business-data.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessStateService {
  private businessesSubject = new BehaviorSubject<Business[]>([]);
  businesses$ = this.businessesSubject.asObservable();

  constructor(private dataService: BusinessDataService) {}

  loadBusinesses() {
    this.dataService.loadBusinesses().subscribe(data => {
      this.businessesSubject.next(data);
    });
  }

  addBusiness(business: Business) {
    this.dataService.addBusiness(business);
    this.businessesSubject.next(this.dataService.getLocalBusinesses());
  }

  updateBusiness(id: number, business: Business) {
    this.dataService.updateBusinessLocal(id, business);
    this.businessesSubject.next(this.dataService.getLocalBusinesses());
  }

  deleteBusiness(id: number) {
    this.dataService.deleteBusinessLocal(id);
    this.businessesSubject.next(this.dataService.getLocalBusinesses());
  }
}
