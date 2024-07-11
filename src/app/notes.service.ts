import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private baseUrl = 'http://localhost/Notizbuch/backend/crud';

  constructor(private http: HttpClient) {}

  getNotes(): Observable<any> {
    const url = `${this.baseUrl}/dashboard_notizen.php`;
    return this.http
      .get<any>(url, { withCredentials: true })
      .pipe(catchError(this.handleError('Failed to load notes')));
  }

  getNoteById(id: number | string): Observable<any> {
    const url = `${this.baseUrl}/details_notizen.php?id=${id}`;
    return this.http
      .get<any>(url, { withCredentials: true })
      .pipe(catchError(this.handleError('Failed to load note')));
  }

  createNote(noteData: any): Observable<any> {
    const url = `${this.baseUrl}/create_notizen.php`;
    return this.http
      .post<any>(url, noteData, { withCredentials: true })
      .pipe(catchError(this.handleError('Failed to create note')));
  }

  updateNote(noteData: any): Observable<any> {
    const url = `${this.baseUrl}/update_notizen.php`;
    return this.http
      .post<any>(url, noteData, { withCredentials: true })
      .pipe(catchError(this.handleError('Failed to update note')));
  }

  deleteNoteById(id: number | string): Observable<any> {
    const url = `${this.baseUrl}/delete_notizen.php?id=${id}`;
    return this.http
      .delete<any>(url, { withCredentials: true })
      .pipe(catchError(this.handleError('Failed to delete note')));
  }

  searchNotes(searchTerm: string): Observable<any[]> {
    const url = `${this.baseUrl}/searchbar_notizen.php`;
    return this.http
      .get<any[]>(url, {
        params: { searchTerm },
        withCredentials: true,
      })
      .pipe(catchError(this.handleError('Failed to search notes')));
  }

  private handleError(message: string) {
    return (error: HttpErrorResponse) => {
      console.error(message, error);
      return throwError(() => new Error(message));
    };
  }
}
