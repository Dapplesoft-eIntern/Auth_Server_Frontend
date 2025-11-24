import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuditLog } from './auditlog.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuditApiService {
  private apiUrl = '/api/auditlogs'; // তোমার backend endpoint

  constructor(private http: HttpClient) {}

  getLogs(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(this.apiUrl);
  }

  createLog(log: AuditLog): Observable<AuditLog> {
    return this.http.post<AuditLog>(this.apiUrl, log);
  }

  updateLog(id: number, log: AuditLog): Observable<AuditLog> {
    return this.http.put<AuditLog>(`${this.apiUrl}/${id}`, log);
  }

  deleteLog(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
