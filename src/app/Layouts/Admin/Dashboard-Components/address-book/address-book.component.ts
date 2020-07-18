import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AddressBookService} from './address-book.service';
import{ UserServiceService}from '../../../../Services/user-service.service'
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';


export interface UserAddress {
 items:[{
    type: string,
    city: string,
    address: string
   }]
  
}

// const ELEMENT_DATA: UserAddress[] = [];

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit  {
  
  userAddresses :any=[];
  userId:''
  datasource:any;
  displayedColumns: string[] = [ 'type', 'city', 'address'];

  constructor(
    public addressService:AddressBookService,
    public user:UserServiceService,
    private route:ActivatedRoute,
    ) {
      // this.addNewAddress(form:NgForm);
      this.viewAddressBook();
   }

  // userAddresses:UserAddress[]=[
  //   {type:'Home',city:'Kohuwela',address:'No.45,Dutugemunu road,Kohuwela'}
  //  ];
  private addressSub:Subscription;

  ngOnInit(): void {
    // this.route.params.subscribe(params=>{
    //     var data=this.user.getAddress(params['id'])
    //     console.log("get")
    //     console.log(data)
    //     this.addressSub=this.addressService.getAddressUpdateListner()
    //       .subscribe((addresses:UserAddress[])=>{
    //         this.userAddresses=addresses;
    //     })
    // })
  }
  viewAddressBook(){
    this.userId=this.route.snapshot.params.id;
    console.log(this.userId);

    this.user.getAddress(this.userId)
      .subscribe((data)=>{
        console.log(data);
        this.userAddresses=data.data;
        this.datasource = new MatTableDataSource(this.userAddresses);
        console.log(this.userAddresses)
      })
  }
  // ngOnDestroy(){
  //   this.addressSub.unsubscribe();
  // }

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
  
}
