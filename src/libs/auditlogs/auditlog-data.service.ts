import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuditLog } from './auditlog.model';

@Injectable({
  providedIn: 'root'
})
export class AuditDataService {


  private logs: AuditLog[] = [
    { id: 1, user_name: 'Arman', business_name: 'ShopX', action: 'Create', description: 'Created a new order', created_at: '2025-11-22 10:00' },
    { id: 2, user_name: 'Rana', business_name: 'ShopY', action: 'Update', description: 'Updated customer info', created_at: '2025-11-22 11:00' },
    { id: 3, user_name: 'Hasan', business_name: 'ShopZ', action: 'Delete', description: 'Deleted an order', created_at: '2025-11-23 09:00' }
  ];

  constructor() {}


  getAll(): Observable<AuditLog[]> {
    return of(this.logs);
  }


  create(log: AuditLog): Observable<AuditLog> {
    const newId = this.logs.length ? Math.max(...this.logs.map(l => l.id)) + 1 : 1;
    const newLog = { ...log, id: newId, created_at: new Date().toISOString() };
    this.logs.push(newLog);
    return of(newLog);
  }


  update(id: number, log: AuditLog): Observable<AuditLog | undefined> {
    const index = this.logs.findIndex(l => l.id === id);
    if (index !== -1) {
      this.logs[index] = { ...this.logs[index], ...log };
      return of(this.logs[index]);
    }
    return of(undefined);
  }

  // Delete a log
  delete(id: number): Observable<boolean> {
    const originalLength = this.logs.length;
    this.logs = this.logs.filter(l => l.id !== id);
    return of(this.logs.length < originalLength);
  }

  // Get logs locally
  getLocalLogs(): AuditLog[] {
    return this.logs;
  }
}
