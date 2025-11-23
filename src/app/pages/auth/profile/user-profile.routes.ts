import { Route } from '@angular/router'
import { PageLayout, setLayout } from '../../../../libs/common-components'

export type UserProfileRoutes = {
    profile: Route
}

export const userprofileRoutes: UserProfileRoutes = {
    profile: {
        path: 'profile',
        pathMatch: 'full',
        loadComponent: () =>
            import('./user-profile/user-profile.component').then(
                (m) => m.UserProfileComponent,
            ),
        resolve: { layout: setLayout(PageLayout.Public) },
    },
}
