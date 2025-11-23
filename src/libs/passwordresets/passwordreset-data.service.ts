
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface PasswordReset {
  id: number;
  user_name: string;
  token: string;
  expires_at: string;
  used: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PasswordDataService {

  private resetTokens: PasswordReset[] = [
    { id: 1, user_name: 'Arman', token: 'abc123reset456', expires_at: '2025-11-25 23:59', used: false },
    { id: 2, user_name: 'Hasan', token: 'def789reset012', expires_at: '2025-11-20 12:00', used: true },
    { id: 3, user_name: 'Rahim', token: 'ghi345reset678', expires_at: '2025-11-22 18:00', used: false }
  ];

  getAll(): Observable<PasswordReset[]> {
    return of(this.resetTokens);
  }

  create(token: PasswordReset): Observable<PasswordReset> {
    const newId = Math.max(...this.resetTokens.map(t => t.id)) + 1;
    token.id = newId;
    this.resetTokens.push(token);
    return of(token);
  }

  update(id: number, token: PasswordReset): Observable<PasswordReset> {
    const index = this.resetTokens.findIndex(t => t.id === id);
    if (index !== -1) this.resetTokens[index] = token;
    return of(token);
  }

  delete(id: number): Observable<void> {
    this.resetTokens = this.resetTokens.filter(t => t.id !== id);
    return of(undefined);
  }
}
