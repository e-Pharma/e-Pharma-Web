import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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

  uploadPrescription(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/order/create`, formData);
  }

  createRelationship(relationData: any): Observable<any> {
    const httpHeaders = {'Authorization': 'Bearer'+ localStorage.getItem('token')}
    const httpHeadersParam = new HttpHeaders(httpHeaders);
    return this.http.post(`${this.apiUrl}/auth/relationship/create`, relationData, { headers: httpHeadersParam });
  }

  getUserData(): Observable<any> {
    const httpHeaders = {'Authorization': 'Bearer'+ localStorage.getItem('token')}
    const httpHeadersParam = new HttpHeaders(httpHeaders);
    return this.http.get(`${this.apiUrl}/auth/getData`, { headers: httpHeadersParam });
  }
  
}
