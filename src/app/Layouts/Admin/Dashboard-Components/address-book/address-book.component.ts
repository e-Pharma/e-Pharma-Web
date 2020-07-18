import { Component, OnInit,OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AddressBookService} from './address-book.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


export interface UserAddress {
 items:[{
    // type: string,
    // city: string,
    address: string
   }]
  
}

// const ELEMENT_DATA: UserAddress[] = [];

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit ,OnDestroy {
  
  userAddresses :any=[];

  constructor(
    public addressService:AddressBookService,
    private route:ActivatedRoute,
    ) {
      // this.addNewAddress(form:NgForm);
   }

  // userAddresses:UserAddress[]=[
  //   {type:'Home',city:'Kohuwela',address:'No.45,Dutugemunu road,Kohuwela'}
  //  ];
  private addressSub:Subscription;

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
        this.addressService.getAddress(params['id']);
        this.addressSub=this.addressService.getAddressUpdateListner()
          .subscribe((addresses:UserAddress[])=>{
            this.userAddresses=addresses;
        })
    })
  }

  ngOnDestroy(){
    this.addressSub.unsubscribe();
  }

  addNewAddress(type,city,address,form:NgForm) {
    console.log(type)
    if(form.invalid){
      return;
    }
    this.route.params.subscribe(params=>{
      this.addressService.addUserAddress(params['id'],type,city,address);
      form.resetForm();
    })

  }
  
  displayedColumns: string[] = [ 'type', 'city', 'address'];
  dataSource = this.userAddresses;
}
