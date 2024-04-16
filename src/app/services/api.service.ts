import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001/api';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  public get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${path}`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }



  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
