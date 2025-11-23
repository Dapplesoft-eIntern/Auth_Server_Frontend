import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { EmailVerificationService } from '../../../../../libs/emailverifications/emailVerification-data.service';
import { EmailVerification } from '../../../../../libs/emailverifications/emailVerification.model';
import { SearchDateFilterComponent } from "../../../shared/components/search-date-filter.component";

@Component({
  selector: 'app-page-email-verifications',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToastModule,
    SearchDateFilterComponent,
  ],
  templateUrl: './page-emailVerifications.component.html',
  styleUrls: ['./page-emailVerifications.component.css'],
  providers: [MessageService]
})
export class PageEmailVerificationsComponent implements OnInit {

  tokens: EmailVerification[] = [];

  constructor(
    private verificationService: EmailVerificationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.verificationService.getVerifications().subscribe(data => {
      this.tokens = data;
    });
  }

  verify(id: bigint) {
    const success = this.verificationService.verifyToken(id);

    if (success) {
      this.tokens = this.tokens.map(t =>
        t.id === id ? { ...t, verified_at: new Date().toISOString() } : t
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Verified',
        detail: 'Email verification token successfully verified!'
      });
    }
  }
}
