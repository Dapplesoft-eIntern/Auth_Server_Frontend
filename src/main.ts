import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from './app/app.component'
import { appConfig } from './app/app.config'
import 'flowbite'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { AuthHeaderInterceptorFn } from './libs/auth'

bootstrapApplication(AppComponent, {
    ...appConfig, // keep existing config
    providers: [
        ...(appConfig.providers || []), // keep other providers
        provideHttpClient(
            withInterceptors([AuthHeaderInterceptorFn]), // interceptor
        ),
    ],
}).catch((err) => console.error(err))
