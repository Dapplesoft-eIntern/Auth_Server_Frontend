import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EmailVerification } from './emailVerification.model';

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService {

  private verifications: EmailVerification[] = [
    {
      id: 1n,
      user_id: 1n,
      token: 'abc123verificationtoken',
      expires_at: '2025-12-01T12:00:00Z',
      verified_at: undefined
    },
    {
      id: 2n,
      user_id: 2n,
      token: 'def456verificationtoken',
      expires_at: '2025-12-05T12:00:00Z',
      verified_at: '2025-11-21T10:00:00Z'
    }
  ];

  constructor() {}


  getVerifications(): Observable<EmailVerification[]> {
    return of(this.verifications);
  }


  verifyToken(id: bigint): boolean {
    const verification = this.verifications.find(v => v.id === id);
    if (verification && !verification.verified_at) {
      verification.verified_at = new Date().toISOString();
      return true;
    }
    return false;
  }


  findByToken(token: string): EmailVerification | undefined {
    return this.verifications.find(v => v.token === token);
  }
}
