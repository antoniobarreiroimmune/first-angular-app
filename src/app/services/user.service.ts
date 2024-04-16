import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service'; 

export class UserService {
  private apiService = inject(ApiService);

  constructor() {
   
  }

  getUserById(id: string): Observable<any> {
    return this.apiService.get<any>(`users/${id}`);
  }
}