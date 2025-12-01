import { Component, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { AuthService } from '../../../auth/service/auth.service'
@Component({
    selector: 'app-dashboard-header',
    imports: [RouterModule],
    templateUrl: './dashboard-header.component.html',
    styleUrl: './dashboard-header.component.css',
})
export class DashboardHeaderComponent {
    private router = inject(Router)
    constructor(private authserver: AuthService) {}
    logOut() {
        this.authserver.logout()
        this.router.navigate(['/login'])
    }
}
