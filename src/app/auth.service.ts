import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost/Notizbuch/backend/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  private userIdSubject = new BehaviorSubject<number | null>(null);
  userId$: Observable<number | null> = this.userIdSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const userData = { username, password };

    return this.http.post<any>(`${this.baseUrl}/login.php`, userData, { headers, withCredentials: true }).pipe(
      catchError(this.handleError),
      tap(response => {
        if (response.success) {
          this.isLoggedInSubject.next(true);
          this.userIdSubject.next(response.userId); // Assuming backend returns userId upon successful login
        }
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('HTTP error occurred:', error);
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error('Detailed error:', error);
    return throwError(() => new Error(errorMessage));
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout.php`, {}, { withCredentials: true }).pipe(
      tap((response: any) => {
        if (response.success) {
          this.isLoggedInSubject.next(false);
          this.userIdSubject.next(null);
        }
      }),
      catchError(this.handleError)
    );
  }

  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.baseUrl}/register.php`, userData, { headers, withCredentials: true });
  }
}
