import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { AuditLog } from './auditlog.model'
import { AuditDataService } from './auditlog-data.service'

@Injectable({
    providedIn: 'root',
})
export class AuditStateService {
    private logsSubject = new BehaviorSubject<AuditLog[]>([])
    logs$ = this.logsSubject.asObservable()

    constructor(private dataService: AuditDataService) {}

    loadLogs() {
        this.dataService.getAll().subscribe((data) => {
            this.logsSubject.next(data)
        })
    }

    addLog(log: AuditLog) {
        this.dataService.create(log).subscribe((newLog) => {
            this.logsSubject.next(this.dataService.getLocalLogs())
        })
    }

    updateLog(id: number, log: AuditLog) {
        this.dataService.update(id, log).subscribe(() => {
            this.logsSubject.next(this.dataService.getLocalLogs())
        })
    }

    deleteLog(id: number) {
        this.dataService.delete(id).subscribe(() => {
            this.logsSubject.next(this.dataService.getLocalLogs())
        })
    }
}
