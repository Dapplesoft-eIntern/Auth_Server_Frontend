import { Injectable } from '@angular/core';
import { MemberApiService } from './member-api.service';
import { BusinessMember } from './member.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberDataService {

  constructor(private api: MemberApiService) {}

  getMembers(): Observable<BusinessMember[]> {
    return this.api.getMembers();
  }

  create(member: BusinessMember): Observable<BusinessMember> {
    return this.api.create(member);
  }

  update(id: number, member: BusinessMember): Observable<BusinessMember> {
    return this.api.update(id, member);
  }

  delete(id: number): Observable<void> {
    return this.api.delete(id);
  }
}
