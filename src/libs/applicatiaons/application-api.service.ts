import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { Application } from './application.model'
import { CreateApplicationDto } from './CreateApplicationDto '

@Injectable({ providedIn: 'root' })
export class ApplicationApiService {
    private apiUrl = `${environment.apiUrl}/applications`

    constructor(private http: HttpClient) {}

    // Authorization headers
    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('jwtToken')
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        })
    }

    // Convert backend DTO to frontend Application
    private toFrontend(app: any): Application {
        return {
            id: app.id,
            name: app.name,
            client_id: app.clientId,
            client_secret: app.clientSecret,
            redirect_uri: app.redirectUri,
            api_base_url: app.apiBaseUrl,
            status: app.status === 1 ? 'active' : 'inactive',
        }
    }

    // Convert frontend form value to backend DTO
    private toDto(formValue: any): CreateApplicationDto {
        return {
            name: formValue.name,
            clientId: formValue.client_id,
            clientSecret: formValue.client_secret,
            redirectUri: formValue.redirect_uri || null,
            apiBaseUrl: formValue.api_base_url || null,
            status: formValue.status === 'active' ? 1 : 2,
        }
    }

    // GET all applications
    getAll(): Observable<Application[]> {
        return this.http
            .get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() })
            .pipe(
                map((apps) => apps.map((app) => this.toFrontend(app))),
                catchError(this.handleError),
            )
    }

    // GET single application by ID
    getById(id: string): Observable<Application> {
        return this.http
            .get<any>(`${this.apiUrl}/${id}`, {
                headers: this.getAuthHeaders(),
            })
            .pipe(
                map((app) => this.toFrontend(app)),
                catchError(this.handleError),
            )
    }

    // POST (create)
    create(formValue: any): Observable<Application> {
        const dto = this.toDto(formValue)
        return this.http
            .post<any>(this.apiUrl, dto, { headers: this.getAuthHeaders() })
            .pipe(
                map((app) => this.toFrontend(app)),
                catchError(this.handleError),
            )
    }

    // PUT (update)
    update(id: string, formValue: any): Observable<Application> {
        const dto = this.toDto(formValue)
        return this.http
            .put<any>(`${this.apiUrl}/${id}`, dto, {
                headers: this.getAuthHeaders(),
            })
            .pipe(
                map((app) => this.toFrontend(app)),
                catchError(this.handleError),
            )
    }

    // DELETE
    delete(id: string): Observable<any> {
        return this.http
            .delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError))
    }

    private handleError(error: any) {
        console.error('API Error:', error)
        return throwError(() => error)
    }
}
