import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type VerifiedotpRoutes = {
    verifiedotp: Route
}

export const VerifiedotpRoutes: VerifiedotpRoutes = {
    verifiedotp: {
        path: 'verifiedotp',
        loadComponent: () =>
            import('./page-verifiedotp/page-verifiedotp.component').then(
                (m) => m.PageVerifiedotpComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Public) },
    },
}
