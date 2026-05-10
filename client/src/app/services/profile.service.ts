import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../in-memory/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getProfile(id: string): Observable<any> {
  return this.http.get<any[]>(this.apiUrl).pipe(
    map(users => users.find(user => user.id === id || user._id === id))
  );
}

  changePassword(
    id: string,
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${id}/change-password`,
      {
        currentPassword,
        newPassword
      }
    );
  }

  deleteAccount(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}