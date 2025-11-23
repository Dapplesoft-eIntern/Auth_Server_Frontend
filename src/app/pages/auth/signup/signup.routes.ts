import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type signupRoutes = {
    signup: Route
}

export const SignupRoutes: signupRoutes = {
    signup: {
        path: 'signup',
        loadComponent: () =>
            import('./page-signup/page-signup.component').then(
                (m) => m.PageSignupComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Public) },
    },
}
