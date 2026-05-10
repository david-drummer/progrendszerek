import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Bookclub } from '../in-memory/models';

@Injectable({
  providedIn: 'root'
})
export class BookclubService {
  private apiUrl = `${environment.apiUrl}/bookclubs`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Bookclub[]> {
    return this.http.get<Bookclub[]>(this.apiUrl);
  }

  getById(id: string): Observable<Bookclub> {
    return this.http.get<Bookclub>(`${this.apiUrl}/${id}`);
  }

  getMyBookclubs(): Observable<Bookclub[]> {
    return this.http.get<Bookclub[]>(`${this.apiUrl}/my`);
  }

  create(bookclub: Partial<Bookclub>): Observable<Bookclub> {
    return this.http.post<Bookclub>(this.apiUrl, bookclub);
  }

  update(id: string, bookclub: Partial<Bookclub>): Observable<Bookclub> {
    return this.http.put<Bookclub>(`${this.apiUrl}/${id}`, bookclub);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addBook(bookclubId: string, book: any): Observable<Bookclub> {
    return this.http.post<Bookclub>(
      `${this.apiUrl}/${bookclubId}/books`,
      book
    );
  }

  addMember(bookclubId: string, userId: string): Observable<Bookclub> {
    return this.http.post<Bookclub>(
      `${this.apiUrl}/${bookclubId}/members`,
      { userId }
    );
  }

  removeMember(bookclubId: string, userId: string): Observable<Bookclub> {
    return this.http.delete<Bookclub>(
      `${this.apiUrl}/${bookclubId}/members/${userId}`
    );
  }
}