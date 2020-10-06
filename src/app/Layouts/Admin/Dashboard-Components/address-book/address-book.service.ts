import {UserAddress} from './address-book.component'
import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeaders } from '@angular/common/http';

@Injectable({providedIn:'root'})

export class AddressBookService{

    apiUrl: string = environment.baseApiUrl;

    
    private address:UserAddress[]=[];
    private addressUpdated =new Subject<UserAddress[]>();
  
    constructor(private http:HttpClient,
            private _snackBar: MatSnackBar){}
   
    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 2000,
        });
        }
    getAddress(id){
        // return [...this.address];
        this.http.get<{message:string,address:UserAddress[]}>('http://localhost:3000/client/viewAddress/'+id)
            .subscribe((info)=>{
                this.address=info.address;
                this.addressUpdated.next([...this.address]);

            })
    }
    getAddressUpdateListner(){
        return this.addressUpdated.asObservable();
    }

    addUserAddress(id:any,type:string,city:string,addressInfo:string){
        const httpHeaders = {'Authorization': 'Bearer'+ localStorage.getItem('token')}
        const httpHeadersParam = new HttpHeaders(httpHeaders);
        const data=[{
            type:type,
            city:city,
            address:addressInfo
        }]
        console.log(data)
        this.http.post<{message:string}>('http://localhost:3000/client/addNewAddress/',data, {headers: httpHeadersParam})
            .subscribe((responseData)=>{
                console.log(responseData.message)
                this.openSnackBar(responseData.message,'done');

                // if(responseData.message=="success"){
                //     // alert(responseData.message);
                //     window.location.reload();

                // }else{
                //     alert(responseData.message);
                // }
                // this.address.push(data);
                this.addressUpdated.next([...this.address]);
            })
    }
    getLatLng(address:string):Observable<any>{
        return this.http.get<{results:any,status:string}>('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyDRbx17EYlBP1rcPruz1zyMFHRk1bwvqkI')
        // 1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDRbx17EYlBP1rcPruz1zyMFHRk1bwvqkI')
    }
}