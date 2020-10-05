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
    const httpHeaders = {'Authorization': 'Bearer'+ localStorage.getItem('token')}
    const httpHeadersParam = new HttpHeaders(httpHeaders);
    return this.http.post(`${this.apiUrl}/client/order/create`, formData, { headers: httpHeadersParam });
  }

  uploadNonePrescription(formData: any): Observable<any> {
    const httpHeaders = {'Authorization': 'Bearer'+ localStorage.getItem('token')}
    const httpHeadersParam = new HttpHeaders(httpHeaders);
    return this.http.post(`${this.apiUrl}/client/order/create/non_prescription`, formData, { headers: httpHeadersParam });
  }

  createRelationship(relationData: any): Observable<any> {
    const httpHeaders = {'Authorization': 'Bearer'+ localStorage.getItem('token')}
    const httpHeadersParam = new HttpHeaders(httpHeaders);
    return this.http.post(`${this.apiUrl}/auth/relationship/create`, relationData, { headers: httpHeadersParam });
  }

  getUserData(): Observable<any> {
    const httpHeaders = {'Authorization': 'Bearer'+ localStorage.getItem('token')}
    const httpHeadersParam = new HttpHeaders(httpHeaders);
    console.log('headerparam',httpHeaders)
    return this.http.get(`${this.apiUrl}/auth/getData`, { headers: httpHeadersParam });
  }

  updateVerification(token: any) {
    const httpHeaders = {'Authorization': 'Bearer'+ token, 'Access-Control-Allow-Origin': '*'}
    const httpHeadersParam = new HttpHeaders(httpHeaders);
    return this.http.put(`${this.apiUrl}/auth/verify_user`, {isVerified: true}, { headers: httpHeadersParam });
  }

  logoutUser() {
    const httpHeaders = {'Authorization': 'Bearer'+ localStorage.getItem('token')}
    const httpHeadersParam = new HttpHeaders(httpHeaders);
    return this.http.put(`${this.apiUrl}/auth/logout`, {isLoggedIn: false}, {headers: httpHeadersParam});
  }

  // getOrderTempData(): Observable<any> {
  //   const httpHeaders = {'Authorization': 'Bearer'+ localStorage.getItem('token')}
  //   const httpHeadersParam = new HttpHeaders(httpHeaders);
  //   return this.http.get(`${this.apiUrl}/admin/orderTemp/get`, {headers: httpHeadersParam});
  // }

  passwordResetURL(email: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/password-reset-url/${email}`);
  }

  sendPasswordResetLink(messageData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/email/send_password_reset_link`, messageData);
  }

  resetPassword(data: any, token: any): Observable<any> {
    const httpHeaders = {'Authorization': 'Bearer'+ token}
    const httpHeadersParam = new HttpHeaders(httpHeaders);
    return this.http.put(`${this.apiUrl}/auth/reset-password`, data, { headers: httpHeadersParam });
  }

  getOrder(id: any): Observable<any> {
    const httpHeaders = {'Authorization': 'Bearer'+ localStorage.getItem('token')}
    const httpHeadersParam = new HttpHeaders(httpHeaders);
    return this.http.get(`${this.apiUrl}/client/order/get/${id}`, { headers: httpHeadersParam });
  }

  getOrders(): Observable<any> {
    const httpHeaders = {'Authorization': 'Bearer'+ localStorage.getItem('token')}
    const httpHeadersParam = new HttpHeaders(httpHeaders);
    return this.http.get(`${this.apiUrl}/client/order/get`, { headers: httpHeadersParam });
  }

  getNotifications(): Observable<any> {
    const httpHeaders = {'Authorization': 'Bearer'+ localStorage.getItem('token')}
    const httpHeadersParam = new HttpHeaders(httpHeaders);
    return this.http.get(`${this.apiUrl}/client/order/get_notifications`, { headers: httpHeadersParam });
  }

  cancelOrder(orderId: any): Observable<any> {
    const httpHeaders = {'Authorization': 'Bearer'+ localStorage.getItem('token')}
    const httpHeadersParam = new HttpHeaders(httpHeaders);
    return this.http.put(`${this.apiUrl}/client/order/cancel_order/${orderId}`, {}, { headers: httpHeadersParam });
  }
  
  getUser(id:any): Observable<any>{
    // return [...this.user]
      return this.http.get<{status:Number,message:String,data:[]}>('http://localhost:3000/client/get/'+id)
  }
  
  editProfile(id,userfName,userlName,userAddress,userContact){
    const obj={
      first_name:userfName,
      last_name:userlName,
      address:userAddress,
      contact_number:userContact
    }
    return this.http.post("http://localhost:3000/client/edit/"+id,obj)
  }
  getAddress(id:any):Observable<any>{
    return this.http.get<{status:Number,message:String,data:[]}>('http://localhost:3000/client/get/address/'+id)
  }

  payOrder(orderId: any): Observable<any> {
    const httpHeaders = {'Authorization': 'Bearer'+ localStorage.getItem('token')}
    const httpHeadersParam = new HttpHeaders(httpHeaders);
    return this.http.put(`${this.apiUrl}/client/order/pay_order/${orderId}`, {status: 'paid'}, { headers: httpHeadersParam });
  }
  // getDriverId(orderId:any){
  //   // const httpHeaders = {'Authorization': 'Bearer'+ localStorage.getItem('token')}
  //   // const httpHeadersParam = new HttpHeaders(httpHeaders);
  //   return this.http.get<{status:Number,message:String,data:[]}>(`${this.apiUrl}/client/get/order/${orderId}`)
  // }
  getDeliveryPersonData(id){
    // const driverId='5f27cb71ef97983f74b05313'
       return this.http.get(`${this.apiUrl}/driver/get/${id}`);
  }

  initializeConnection(message: any): Observable<any> {
    const httpHeaders = {'Authorization': 'Bearer'+ localStorage.getItem('token')}
    const httpHeadersParam = new HttpHeaders(httpHeaders);
    return this.http.post('/initChat', message, { headers: httpHeadersParam });
  }

  getAddressBook(): Observable<any> {
    const httpHeaders = {'Authorization': 'Bearer'+ localStorage.getItem('token')}
    const httpHeadersParam = new HttpHeaders(httpHeaders);
    return this.http.get(`${this.apiUrl}/client/address/getAll`, { headers: httpHeadersParam });
  }

}
