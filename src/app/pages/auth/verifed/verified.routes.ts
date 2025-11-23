import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type VerifiedRoutes = {
    verified: Route
}

export const VerifiedRoutes: VerifiedRoutes = {
    verified: {
        path: 'verified',
        loadComponent: () =>
            import('./page-verified/page-verified.component').then(
                (m) => m.PageVerifiedComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Public) },
    },
}
