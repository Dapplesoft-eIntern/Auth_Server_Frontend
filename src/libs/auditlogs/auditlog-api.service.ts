import { HttpClient } from '@angular/common/http'
import { Inject, Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '../common-service/lib/api.service'
import { ENVIRONMENT, EnvironmentConfig } from '../core'
import { AuditLog, AuditLogDto } from './auditlog.model'

@Injectable({
    providedIn: 'root',
})
export class AuditApiService extends ApiService<AuditLog, AuditLogDto> {
    constructor(
        @Inject(ENVIRONMENT)
        private env: EnvironmentConfig,
    ) {
        super(inject(HttpClient), `${env.apiUrl}/auditlogs`)
    }
}
