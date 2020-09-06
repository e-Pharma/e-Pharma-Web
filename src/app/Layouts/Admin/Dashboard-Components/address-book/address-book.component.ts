import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AddressBookService} from './address-book.service';
import{ UserServiceService}from '../../../../Services/user-service.service'
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

export interface UserAddress {
 items:[{
    type: string,
    city: string,
    address: string
   }]
  
}

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})

export class AddressBookComponent implements OnInit  {

  
  userAddresses :any=[];
  userId:'';
  datasource:any;
  displayedColumns: string[] = [ 'type', 'city', 'address'];
  
/* Pharamcy location*/
  lat = 6.902118;
  lng = 79.861218;

/* Delivery area-radius */
  radius = 15000; // 15 km
   
  latMax=7.038110;
  latMin=6.763110;
  
  lngMax=80.001142;
  lngMin=79.721142;

  /*new  user added address*/
   new_lat;
   new_lng;
 

  constructor(
    public addressService:AddressBookService,
    public user:UserServiceService,
    private route:ActivatedRoute,
    ) 
    {
      this.viewAddressBook();
    }
  private addressSub:Subscription;

  ngOnInit(): void {

   }

 /* Check the user added address is  within the delivery area*/
   checkAddress(lat,lng){
     console.log("checkaddress func")
    //  if(this.new_lat>this.latMin && this.lat < this.latMax){
       if(lng> this.lngMin && lng < this.lngMax &&lat>this.latMin && lat < this.latMax){
          console.log("You are within our delivery area");
          return('OK')
       }else{
         return('Sorry, you are out of our delivery area')
       }
  }
 
 /* get the latitude and longtitude of user added address*/
 codeAddress(type,city,address,form:NgForm){
  let result
  console.log("codeaddress func")
   this.addressService.getLatLng(address)
   .subscribe((data)=>{
     console.log('data status',data.status)
     if(data.status=='OK'){
           console.log(data.results[0].geometry.location)
           this.new_lat=data.results[0].geometry.location.lat
           this.new_lng=data.results[0].geometry.location.lng
           result=this.checkAddress(this.new_lat,this.new_lng)
           this.addNewAddress(type,city,address,form,result)
           console.log('codeAddress/result:',result)
           return result;
      }else{
        console.log('Error:',data.status)
        return(data.status)
      }
   })
 }
 
/* display delivery addresses */
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
 
  
/*add new delivery address to the address book*/
  addNewAddress(type,city,address,form:NgForm,result) {
    if(form.invalid){
      return;
    }

    // result=this.codeAddress(address)
    console.log('addNewAddress/result:',result)
    if(result=='OK'){
      this.route.params.subscribe(params=>{
        this.addressService.addUserAddress(params['id'],type,city,address);
        this.viewAddressBook()
        form.resetForm();
        console.log(result)       
        })
      }
    else{
      console.log('add address failed',result)
      alert(result)
      form.resetForm();
    }
  }

}
