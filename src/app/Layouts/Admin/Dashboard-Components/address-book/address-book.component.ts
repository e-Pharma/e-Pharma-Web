import { Component, OnInit,OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AddressBookService} from './address-book.service';
import { Subscription } from 'rxjs';

export interface UserAddress {
  type: string;
  city: string;
  address: string;
}

// const ELEMENT_DATA: UserAddress[] = [];

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit ,OnDestroy {
  
  userAddresses :any=[];

  constructor(public addressService:AddressBookService) {
      // this.addNewAddress(form:NgForm);
   }

  // userAddresses:UserAddress[]=[
  //   {type:'Home',city:'Kohuwela',address:'No.45,Dutugemunu road,Kohuwela'}
  //  ];
  private addressSub:Subscription;

  ngOnInit(): void {
    this.addressService.getAddress();
    this.addressSub=this.addressService.getAddressUpdateListner()
      .subscribe((addresses:UserAddress[])=>{
        this.userAddresses=addresses;
      })
  }

  ngOnDestroy(){
    this.addressSub.unsubscribe();
  }

  addNewAddress(form:NgForm) {
    if(form.invalid){
      return;
    }
      
    this.addressService.addUserAddress(form.value.type,form.value.city,form.value.address);
    form.resetForm();

  }
  
  displayedColumns: string[] = [ 'type', 'city', 'address'];
  dataSource = this.userAddresses;
}
