import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Login } from './login.model'

@Injectable({
    providedIn: 'root',
})
export class LoginApiService {
    constructor(private http: HttpClient) {}

    login(payload: Login): Observable<any> {
        return this.http.post('/api/login', payload)
    }
}
