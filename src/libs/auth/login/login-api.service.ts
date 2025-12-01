import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { catchError, Observable, tap, throwError } from 'rxjs'
import { environment } from '../../../environment/environment'
import { TokenStorageService } from '../service/token-storage.service'
import { LoginRequest, LoginResponse } from './login.model'

@Injectable({
    providedIn: 'root',
})
export class LoginApiService {
    // Modern dependency injection
    private http = inject(HttpClient)
    private tokenStorageService = inject(TokenStorageService)
    private baseUrl = `${environment.authApiUrl}`

    login(payload: LoginRequest): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(`${this.baseUrl}/users/login`, payload)
            .pipe(
                // tap() to handle the side effect (saving the token)
                tap((response) => {
                    // Ensure the response contains the token before saving
                    if (response.token) {
                        this.tokenStorageService.saveAccessToken(response.token)
                        console.log(
                            'Access token successfully saved to storage.',
                        )
                    }
                    if (response.refreshToken) {
                        this.tokenStorageService.saveRefreshToken(
                            response.refreshToken,
                        )
                        console.log(
                            'Refresh token successfully saved to storage.',
                        )
                    }
                }),
                // error handling to clear tokens if the login fails
                catchError((error) => {
                    // Clear any potentially lingering or bad tokens if the API call fails
                    this.tokenStorageService.clear()
                    return throwError(() => error)
                }),
            )
    }
}
