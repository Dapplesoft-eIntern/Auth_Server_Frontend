

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-verifiedotp',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, ToastModule],
  providers: [MessageService],
  templateUrl: './page-verifiedotp.component.html',
})
export class PageVerifiedotpComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  router = inject(Router);
  messageService = inject(MessageService);

  otpForm!: FormGroup;
  timer: number = 60;
  intervalId: any;
  resendDisabled: boolean = true;

  ngOnInit() {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      rememberMe: [false]
    });

    this.startTimer();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startTimer() {
    this.timer = 60;
    this.resendDisabled = true;
    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.intervalId);
        this.resendDisabled = false;
      }
    }, 1000);
  }

  resendOtp() {
    this.messageService.add({ severity: 'info', summary: 'OTP Sent', detail: 'A new OTP has been sent', life: 1500 });
    this.startTimer();
  }

  onSubmit() {
    this.otpForm.markAllAsTouched();

    if (this.otpForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter a valid OTP', life: 2000 });
      return;
    }

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'OTP verified successfully!', life: 1500 });

    setTimeout(() => this.router.navigate(['/reset']), 1500);
  }

  get otpControl() {
    return this.otpForm.get('otp');
  }
}
