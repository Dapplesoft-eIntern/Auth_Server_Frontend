import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { AuditLog } from './auditlog.model'

@Injectable({ providedIn: 'root' })
export class AuditApiService {
    private apiUrl = `${environment.apiUrl}/auditlogs`

    constructor(private http: HttpClient) {}

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('jwtToken')
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        })
    }

    getAll(): Observable<AuditLog[]> {
        return this.http
            .get<AuditLog[]>(this.apiUrl, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError))
    }

    getById(id: number): Observable<AuditLog> {
        return this.http
            .get<AuditLog>(`${this.apiUrl}/${id}`, {
                headers: this.getAuthHeaders(),
            })
            .pipe(catchError(this.handleError))
    }

    create(log: AuditLog): Observable<AuditLog> {
        return this.http
            .post<AuditLog>(this.apiUrl, log, {
                headers: this.getAuthHeaders(),
            })
            .pipe(catchError(this.handleError))
    }

    update(id: number, log: Partial<AuditLog>): Observable<AuditLog> {
        return this.http
            .put<AuditLog>(`${this.apiUrl}/${id}`, log, {
                headers: this.getAuthHeaders(),
            })
            .pipe(catchError(this.handleError))
    }

    delete(id: number): Observable<any> {
        return this.http
            .delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError))
    }

    private handleError(error: any) {
        console.error('API Error:', error)
        return throwError(() => error)
    }
}
