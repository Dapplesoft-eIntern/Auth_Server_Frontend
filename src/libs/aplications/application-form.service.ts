import { Injectable } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { Application, ApplicationDto } from './application.model'

@Injectable({
    providedIn: 'root',
})
export class ApplicationFormService {
    form: FormGroup

    constructor(private fb: NonNullableFormBuilder) {
        this.form = this.buildForm()
    }

    buildForm(): FormGroup {
        const { required, minLength } = Validators

        return this.fb.group({
            name: ['', [required, minLength(2)]],
            clientId: ['', [required, minLength(2)]],
            clientSecret: ['', [required, minLength(2)]],
            redirectUri: ['', [required]],
            apiBaseUrl: ['', [required]],
            status: [1, [required]],
        })
    }

    controls(control: string) {
        return this.form.get(control)
    }

    getValue(): ApplicationDto & {
        clientId: string
        clientSecret: string
        status: number
    } {
        return this.form.getRawValue()
    }

    patchForm(application: Application) {
        this.form.patchValue({
            name: application.name,
            clientId: application.clientId,
            clientSecret: application.clientSecret,
            redirectUri: application.redirectUri,
            apiBaseUrl: application.apiBaseUrl,
            status: application.status,
        })
    }

    resetForm() {
        this.form.reset({
            name: '',
            clientId: '',
            clientSecret: '',
            redirectUri: '',
            apiBaseUrl: '',
            status: 1,
        })
    }
}
