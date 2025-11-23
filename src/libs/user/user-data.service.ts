import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    { id: 1, name: 'Mohammad Arman', email: 'arman@example.com', role: 'Admin' },
    { id: 2, name: 'Hasan Ali', email: 'hasan@example.com', role: 'User' },
    { id: 3, name: 'Rahim Khan', email: 'rahim@example.com', role: 'User' },
    { id: 4, name: 'Sadia Noor', email: 'sadia@example.com', role: 'Manager' },
    { id: 5, name: 'Nayeem Ahmed', email: 'nayeem@example.com', role: 'User' },
    { id: 6, name: 'Ayesha Khan', email: 'ayesha@example.com', role: 'User' },
    { id: 7, name: 'Imran Hossain', email: 'imran@example.com', role: 'Admin' },
    { id: 8, name: 'Nadia Faruk', email: 'nadia@example.com', role: 'Manager' },
    { id: 9, name: 'Arif Rahman', email: 'arif@example.com', role: 'User' },
    { id: 10, name: 'Sumi Begum', email: 'sumi@example.com', role: 'User' },
    { id: 11, name: 'Tanvir Hasan', email: 'tanvir@example.com', role: 'User' },
    { id: 12, name: 'Rana Alam', email: 'rana@example.com', role: 'Manager' },
    { id: 13, name: 'Mita Roy', email: 'mita@example.com', role: 'Admin' },
    { id: 14, name: 'Sabbir Hossain', email: 'sabbir@example.com', role: 'User' },
    { id: 15, name: 'Tania Islam', email: 'tania@example.com', role: 'User' }
  ];


  constructor() { }


  getAll(): Observable<User[]> {
    return of(this.users);
  }


  delete(id: number): Observable<boolean> {
    this.users = this.users.filter(u => u.id !== id);
    return of(true);
  }


  update(id: number, userData: Partial<User>): Observable<User> {
    const index = this.users.findIndex(u => u.id === id);
    if (index > -1) {
      this.users[index] = { ...this.users[index], ...userData };
    }
    return of(this.users[index]);
  }
}
