import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserHistory } from './user-history.model';


@Injectable({
  providedIn: 'root'
})
export class UserHistoryService {

  private history: UserHistory[] = [
    { id: 1, user_id: 101, user_name: 'Mohammad Arman', ip_address: '192.168.1.1', country: 'Bangladesh', city: 'Dhaka', browser: 'Chrome', os: 'Windows 10', device: 'desktop', login_time: '2025-11-21 10:00', logout_time: '2025-11-21 12:00', status: 'success' },
    { id: 2, user_id: 102, user_name: 'Hasan Ali', ip_address: '192.168.1.2', country: 'Bangladesh', city: 'Chittagong', browser: 'Firefox', os: 'Ubuntu', device: 'desktop', login_time: '2025-11-21 11:00', logout_time: '2025-11-21 11:30', status: 'failed' },
    { id: 3, user_id: 103, user_name: 'Rahim Khan', ip_address: '192.168.1.3', country: 'Bangladesh', city: 'Sylhet', browser: 'Edge', os: 'Windows 11', device: 'desktop', login_time: '2025-11-21 09:45', logout_time: '2025-11-21 10:30', status: 'success' },
    { id: 4, user_id: 104, user_name: 'Sadia Noor', ip_address: '192.168.1.4', country: 'Bangladesh', city: 'Khulna', browser: 'Chrome', os: 'Windows 10', device: 'desktop', login_time: '2025-11-21 08:20', logout_time: '2025-11-21 09:15', status: 'success' },
    { id: 5, user_id: 105, user_name: 'Nayeem Ahmed', ip_address: '192.168.1.5', country: 'Bangladesh', city: 'Rajshahi', browser: 'Firefox', os: 'Ubuntu', device: 'desktop', login_time: '2025-11-21 13:00', logout_time: '2025-11-21 14:00', status: 'failed' },
    { id: 6, user_id: 106, user_name: 'Farhana Islam', ip_address: '192.168.1.6', country: 'Bangladesh', city: 'Barishal', browser: 'Chrome', os: 'Windows 10', device: 'mobile', login_time: '2025-11-21 07:30', logout_time: '2025-11-21 08:15', status: 'success' },
    { id: 7, user_id: 107, user_name: 'Imran Hossain', ip_address: '192.168.1.7', country: 'Bangladesh', city: 'Mymensingh', browser: 'Edge', os: 'Windows 11', device: 'desktop', login_time: '2025-11-21 12:00', logout_time: '2025-11-21 13:00', status: 'success' },
    { id: 8, user_id: 108, user_name: 'Tahmina Akter', ip_address: '192.168.1.8', country: 'Bangladesh', city: 'Dhaka', browser: 'Firefox', os: 'Ubuntu', device: 'mobile', login_time: '2025-11-21 09:00', logout_time: '2025-11-21 09:45', status: 'failed' },
    { id: 9, user_id: 109, user_name: 'Shahidul Islam', ip_address: '192.168.1.9', country: 'Bangladesh', city: 'Chittagong', browser: 'Chrome', os: 'Windows 10', device: 'desktop', login_time: '2025-11-21 14:00', logout_time: '2025-11-21 14:30', status: 'success' },
    { id: 10, user_id: 110, user_name: 'Rumana Sultana', ip_address: '192.168.1.10', country: 'Bangladesh', city: 'Sylhet', browser: 'Edge', os: 'Windows 11', device: 'desktop', login_time: '2025-11-21 10:15', logout_time: '2025-11-21 11:00', status: 'success' },
    { id: 11, user_id: 111, user_name: 'Hasib Mahmud', ip_address: '192.168.1.11', country: 'Bangladesh', city: 'Khulna', browser: 'Chrome', os: 'Windows 10', device: 'mobile', login_time: '2025-11-21 11:30', logout_time: '2025-11-21 12:15', status: 'failed' },
    { id: 12, user_id: 112, user_name: 'Amina Khatun', ip_address: '192.168.1.12', country: 'Bangladesh', city: 'Rajshahi', browser: 'Firefox', os: 'Ubuntu', device: 'desktop', login_time: '2025-11-21 13:15', logout_time: '2025-11-21 14:00', status: 'success' },
    { id: 13, user_id: 113, user_name: 'Rakibul Hasan', ip_address: '192.168.1.13', country: 'Bangladesh', city: 'Barishal', browser: 'Chrome', os: 'Windows 10', device: 'desktop', login_time: '2025-11-21 08:45', logout_time: '2025-11-21 09:30', status: 'success' },
    { id: 14, user_id: 114, user_name: 'Tariq Ahmed', ip_address: '192.168.1.14', country: 'Bangladesh', city: 'Mymensingh', browser: 'Edge', os: 'Windows 11', device: 'desktop', login_time: '2025-11-21 12:30', logout_time: '2025-11-21 13:15', status: 'failed' },
    { id: 15, user_id: 115, user_name: 'Lina Rahman', ip_address: '192.168.1.15', country: 'Bangladesh', city: 'Dhaka', browser: 'Firefox', os: 'Ubuntu', device: 'mobile', login_time: '2025-11-21 09:30', logout_time: '2025-11-21 10:00', status: 'success' }
  ];


  getAll(): Observable<UserHistory[]> {
    return of(this.history);
  }

  delete(id: number): Observable<boolean> {
    this.history = this.history.filter(h => h.id !== id);
    return of(true);
  }

  update(id: number, data: Partial<UserHistory>): Observable<UserHistory> {
    const index = this.history.findIndex(h => h.id === id);
    if (index > -1) {
      this.history[index] = { ...this.history[index], ...data };
    }
    return of(this.history[index]);
  }
}
