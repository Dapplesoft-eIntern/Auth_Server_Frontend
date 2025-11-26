import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { Signup } from './signup.model'
// import { TokenStorageService } from '../token/token-storage.service';

@Injectable({ providedIn: 'root' })
export class SignupApiService {
    private http = inject(HttpClient)
    //   private storage = inject(TokenStorageService);

    signup(payload: Signup): Observable<any> {
        return this.http.post('/api/signup', payload).pipe(
            tap((res: any) => {
                // if (res?.access) this.storage.saveAccessToken(res.access);
                // if (res?.refresh) this.storage.saveRefreshToken(res.refresh);
            }),
        )
    }
}
