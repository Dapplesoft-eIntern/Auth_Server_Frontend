
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Application } from './application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private applications: Application[] = [
    {
      id: 1n,
      name: 'App One',
      client_id: 'client_001',
      client_secret: 'secret_001',
      redirect_uri: 'https://example.com/callback',
      api_base_url: 'https://api.example.com',
      status: 'active'
    },
    {
      id: 2n,
      name: 'App Two',
      client_id: 'client_002',
      client_secret: 'secret_002',
      status: 'inactive'
    },
    {
      id: 3n,
      name: 'App Three',
      client_id: 'client_003',
      client_secret: 'secret_003',
      redirect_uri: 'https://example.org/callback',
      api_base_url: 'https://api.example.org',
      status: 'active'
    }
  ];

  constructor() {}


  getAll(): Observable<Application[]> {
    return of(this.applications);
  }


  getById(id: bigint): Observable<Application | undefined> {
    return of(this.applications.find(app => app.id === id));
  }


  create(application: Application): Observable<Application> {
    this.applications.push(application);
    return of(application);
  }


  update(id: bigint, data: Partial<Application>): Observable<Application | undefined> {
    const index = this.applications.findIndex(app => app.id === id);
    if (index > -1) {
      this.applications[index] = { ...this.applications[index], ...data };
      return of(this.applications[index]);
    }
    return of(undefined);
  }


  delete(id: bigint): Observable<boolean> {
    const originalLength = this.applications.length;
    this.applications = this.applications.filter(app => app.id !== id);
    return of(this.applications.length < originalLength);
  }
}
