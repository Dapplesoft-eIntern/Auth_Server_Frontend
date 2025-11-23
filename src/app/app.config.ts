import {
    ApplicationConfig,
    provideAppInitializer,
    provideZonelessChangeDetection,
} from '@angular/core'
import {
    PreloadAllModules,
    provideRouter,
    withComponentInputBinding,
    withInMemoryScrolling,
    withPreloading,
    withRouterConfig,
} from '@angular/router'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { appInitializerFn, ENVIRONMENT } from '../libs/core'
import { environment } from '../environment/environment.prod'
import { ACCESS_TOKEN_KEY, AUTH_API_URL, REFRESH_TOKEN_KEY } from '../libs/auth'
import { appRoutes } from './app.routes'
import {
    provideHttpClient,
    withInterceptors,
    withInterceptorsFromDi,
    withJsonpSupport,
    withXsrfConfiguration,
} from '@angular/common/http'
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common'
import { providePrimeNG } from 'primeng/config'
import Aura from '@primeuix/themes/aura'
import { ConfirmationService, MessageService } from 'primeng/api'
import { DialogService } from 'primeng/dynamicdialog'

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: ENVIRONMENT, useValue: environment },
        { provide: AUTH_API_URL, useValue: environment.authApiUrl },
        { provide: ACCESS_TOKEN_KEY, useValue: 'accessToken' },
        { provide: REFRESH_TOKEN_KEY, useValue: 'refreshToken' },
        provideAppInitializer(appInitializerFn),
        provideZonelessChangeDetection(),
        provideRouter(
            appRoutes,
            withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
            withRouterConfig({ onSameUrlNavigation: 'reload' }),
            withComponentInputBinding(),
            withPreloading(PreloadAllModules),
        ),
        provideHttpClient(
            withXsrfConfiguration({}),
            withJsonpSupport(),
            // withInterceptors([AuthHeaderInterceptorFn]),
            withInterceptorsFromDi(),
        ),
        {
            provide: DATE_PIPE_DEFAULT_OPTIONS,
            useValue: { timezone: 'UTC', dateFormat: 'shortDate' },
        },
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    prefix: 'p',
                    darkModeSelector: '.dark',
                    cssLayer: {
                        name: 'primeng',
                        order: 'theme, base, primeng, utilities',
                    },
                },
            },
        }),
        MessageService,
        ConfirmationService,
        DialogService,
    ],
}
