import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type LoginRoutes = {
    login: Route
}

export const loginRoutes: LoginRoutes = {
    login: {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
            import('./page-login/page-login.component').then(
                (m) => m.PageLoginComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Public) },
    },
}
