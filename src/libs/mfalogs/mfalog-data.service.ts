
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MfaLog } from './mfalog.model';

@Injectable({
  providedIn: 'root'
})
export class MfaLogsService {

  private mfaLogs: MfaLog[] = [
    { id: 1, user_name: 'Arman', login_time: '2025-11-20 08:30', ip_address: '192.168.1.10', device: 'Chrome on Windows', status: 'success' },
    { id: 2, user_name: 'Hasan', login_time: '2025-11-20 09:15', ip_address: '192.168.1.11', device: 'Firefox on MacOS', status: 'failed' },

  ];

  constructor() {}

  getAll(): Observable<MfaLog[]> {
    return of(this.mfaLogs);
  }

  create(log: MfaLog): Observable<MfaLog> {
    const newId = Math.max(...this.mfaLogs.map(l => l.id)) + 1;
    log.id = newId;
    this.mfaLogs.push(log);
    return of(log);
  }

  update(id: number, log: MfaLog): Observable<MfaLog> {
    const index = this.mfaLogs.findIndex(l => l.id === id);
    if (index !== -1) this.mfaLogs[index] = log;
    return of(log);
  }

delete(id: number): Observable<void> {
  this.mfaLogs = this.mfaLogs.filter(l => l.id !== id);
  return of(undefined);
}

}
