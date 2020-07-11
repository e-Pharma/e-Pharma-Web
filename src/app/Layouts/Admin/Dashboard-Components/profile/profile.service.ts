import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})

export class ProfileService{
    

    // private userUpdated =new Subject<UserInfo[]>();
   
    constructor(private http:HttpClient){}

    getUser(){
      // return [...this.user]
        return this.http.get<{status:Number,message:String,data:[]}>("http://localhost:3000/client/get/5eff0dbb44376c5f074aaa63")
             }
    // getUserUpdateListner(){
    //     return this.userUpdated.asObservable();
    // }

    // addUserAddress(type:string,city:string,addressInfo:string){
    //     const post:UserAddress ={type:type,city:city,address:addressInfo};
    //     this.address.push(post);
    //     this.addressUpdated.next([...this.address]);
    // }

}