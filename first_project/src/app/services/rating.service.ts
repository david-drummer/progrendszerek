import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rating } from '../in-memory/models';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = `${environment.apiUrl}/ratings`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.apiUrl);
  }

  getById(id: string): Observable<Rating> {
    return this.http.get<Rating>(`${this.apiUrl}/${id}`);
  }

  create(rating: Partial<Rating>): Observable<Rating> {
    return this.http.post<Rating>(this.apiUrl, rating);
  }

  update(id: string, rating: Partial<Rating>): Observable<Rating> {
    return this.http.put<Rating>(`${this.apiUrl}/${id}`, rating);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}