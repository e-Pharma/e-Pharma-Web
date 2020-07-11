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
        // return [...this.address];
        this.http.get<{message:string,address:UserAddress[]}>('http://localhost:3000/client/viewAddress/:id')
            .subscribe((info)=>{
                this.address=info.address;
                this.addressUpdated.next([...this.address]);

            })
    }
    getAddressUpdateListner(){
        return this.addressUpdated.asObservable();
    }

    addUserAddress(type:string,city:string,addressInfo:string){
        const post:UserAddress ={type:type,city:city,address:addressInfo};
        this.http.post<{message:string}>('http://localhost:3000/client/addNewAddress/5eff0dbb44376c5f074aaa63',post)
            .subscribe((responseData)=>{
                console.log(responseData.message)
                this.address.push(post);
                this.addressUpdated.next([...this.address]);
            })
        
    }

}