import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { FloatLabelModule } from 'primeng/floatlabel'
import { ToastModule } from 'primeng/toast'

@Component({
    selector: 'app-verified',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        ToastModule,
        FloatLabelModule,
    ],
    templateUrl: './page-verified.component.html',
    providers: [MessageService],
})
export class PageVerifiedComponent {
    form: FormGroup
    submitted = false

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router,
    ) {
        this.form = this.fb.group({
            identifier: ['', [Validators.required, this.emailOrPhoneValidator]],
        })
    }

    emailOrPhoneValidator(control: AbstractControl) {
        const value = control.value
        if (!value) return null

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^[0-9]{11}$/

        if (emailRegex.test(value) || phoneRegex.test(value)) {
            return null
        }

        return { invalidFormat: true }
    }

    get f() {
        return this.form.controls
    }

    onSubmit() {
        this.submitted = true

        if (this.form.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Enter a valid email or phone number.',
            })
            return
        }

        const value = this.form.value.identifier
        const method = value.includes('@') ? 'email' : 'phone'

        console.log('Send OTP to:', value)

        this.messageService.add({
            severity: 'success',
            summary: 'OTP Sent',
            detail: `OTP sent to your ${method}`,
        })

        setTimeout(() => {
            this.router.navigate(['/verifiedotp'], {
                state: { method, value },
            })
        }, 1500)
    }
}
