import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  apiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Register new user.
   * @param userData User Information.
   */
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  /**
   * Login User.
   * @param userCredentials User Login Data.
   */
  loginUser(userCredentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, userCredentials);
  }

  verificationMail(mailData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/email/send_verification`, mailData);
  }
  
}