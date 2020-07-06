import {UserAddress} from './address-book.component'
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})

export class AddressBookService{
    
    private address:UserAddress[]=[];
    private addressUpdated =new Subject<UserAddress[]>();
   
    constructor(private http:HttpClient){}

    getAddress(){
        return [...this.address];
        // this.http.get<UserAddress>('http://localhost:3000/client/viewAddress/:id')
        //     .subscribe(()=>{

        //     })
    }
    getAddressUpdateListner(){
        return this.addressUpdated.asObservable();
    }

    addUserAddress(type:string,city:string,addressInfo:string){
        const post:UserAddress ={type:type,city:city,address:addressInfo};
        this.address.push(post);
        this.addressUpdated.next([...this.address]);
    }

}