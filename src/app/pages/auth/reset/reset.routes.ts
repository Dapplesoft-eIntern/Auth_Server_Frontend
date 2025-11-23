import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type ResetRoutes = {
    reset: Route
}

export const resetRoutes: ResetRoutes = {
    reset: {
        path: 'reset',
        loadComponent: () =>
            import('./page-reset/page-reset.component').then(
                (m) => m.PageResetComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Public) },
    },
}
