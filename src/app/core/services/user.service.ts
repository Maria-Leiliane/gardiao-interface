import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UpdateProfilePayload, UpdateEmailPayload, UpdatePasswordPayload } from '../models/user.model';
import { SupportContact } from '../models/support-contact.model';
import {environment} from '../../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/profile`);
  }

  updateProfile(payload: UpdateProfilePayload): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/user/profile`, payload);
  }

  updateEmail(payload: UpdateEmailPayload): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/email`, payload);
  }

  updatePassword(payload: UpdatePasswordPayload): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/password`, payload);
  }

  addSupportContact(contact: SupportContact): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/support-contact`, contact);
  }

  getSupportContacts(): Observable<SupportContact[]> {
    return this.http.get<SupportContact[]>(`${this.apiUrl}/user/support-contact`);
  }

  deleteSupportContact(contactId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/support-contact/${contactId}`);
  }
}
