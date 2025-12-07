import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, map, Observable, throwError } from 'rxjs'
import { environment } from '../../environments/environment.prod'
import { Application } from './application.model'
import { CreateApplicationDto } from './CreateApplicationDto '

@Injectable({ providedIn: 'root' })
export class ApplicationApiService {
    private apiUrl = `${environment.apiUrl}/applications`

    constructor(private http: HttpClient) {}

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('jwtToken')
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        })
    }

    // Convert numeric status to string for frontend display
    private toFrontend(app: any): Application {
        return {
            ...app,
            client_id: app.clientId,
            client_secret: app.clientSecret,
            redirect_uri: app.redirectUri,
            api_base_url: app.apiBaseUrl,
            status: app.status === 1 ? 'active' : 'inactive',
        }
    }

    getAll(): Observable<Application[]> {
        return this.http
            .get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() })
            .pipe(
                map((apps) => apps.map((app) => this.toFrontend(app))),
                catchError(this.handleError),
            )
    }

    create(dto: CreateApplicationDto): Observable<Application> {
        return this.http
            .post<any>(this.apiUrl, dto, { headers: this.getAuthHeaders() })
            .pipe(
                map((app) => this.toFrontend(app)),
                catchError(this.handleError),
            )
    }

    update(id: bigint, dto: CreateApplicationDto): Observable<Application> {
        return this.http
            .put<any>(`${this.apiUrl}/${id}`, dto, {
                headers: this.getAuthHeaders(),
            })
            .pipe(
                map((app) => this.toFrontend(app)),
                catchError(this.handleError),
            )
    }

    delete(id: bigint): Observable<any> {
        return this.http
            .delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError))
    }

    private handleError(error: any) {
        console.error('API Error:', error)
        return throwError(() => error)
    }
}
