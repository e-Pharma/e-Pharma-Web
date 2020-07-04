import {UserAddress} from './address-book.component'
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'

@Injectable({providedIn:'root'})

export class AddressBookService{
    
    private address:UserAddress[]=[];
    private addressUpdated =new Subject<UserAddress[]>();
   
    getAddress(){
        return [...this.address];
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