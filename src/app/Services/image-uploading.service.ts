import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadingService {

  baseAPI: any = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  checkImageClarity(file: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.set(name, 'prescription_image');
    return this.http.post(`${this.baseAPI}/image/check_quality`, formData);
  }

  getImageUrl(file: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseAPI}/image/get_url`, formData);
  }

}
