import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://backendtesisecommerce.onrender.com/api/users';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password })
      .pipe(
        map((response: any) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }
  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { email, newPassword })
      .pipe(
        catchError(this.handleError)
      );
  }
  
  register(nombre: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { nombre, email, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      if (error.status === 400 && error.error.msg) {
        errorMessage = error.error.msg;
      } else if (error.status === 404) {
        errorMessage = 'Usuario no encontrado';
      } else if (error.status === 401) {
        errorMessage = 'Contraseña incorrecta';
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
