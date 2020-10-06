import { Component, OnInit } from '@angular/core';
import{ UserServiceService}from '../../../../Services/user-service.service'
import * as io from 'socket.io-client'
import {MatDialog} from '@angular/material/dialog';
import {FeedbackComponent} from '../feedback/feedback.component'

@Component({
  selector: 'app-order-tracker',
  templateUrl: './order-tracker.component.html',
  styleUrls: ['./order-tracker.component.css']
})
export class OrderTrackerComponent implements OnInit {

  socket;

/* Pharamcy location*/
  lat = 6.902118;
  lng = 79.861218;
  pharmacyIcon = {
    url: 'https://cdn2.iconfinder.com/data/icons/map-locations-colored-outlined-pixel-perfect/64/pin-map-location-03-512.png',
    scaledSize: {
      width: 40,
      height: 40 
    }
}

/*Delivery Person Data*/
  deliveryPerson:any =[];
  deliveryLat:Number;
  deliveryLng:Number;
  Id;
  
  driverIcon = {
    url: 'https://jillyscarwash.com/wp-content/uploads/2018/09/jillys-marker-map-pin-300x300.png',
    scaledSize: {
      width: 40,
      height: 40 
    },
} 
 
  constructor(public userService:UserServiceService,public dialog: MatDialog) { 
    this.getDeliveryPerson();
    this.socket=io('http://localhost:3000'); // change in to the base url

  }
  openDialog() {
    const dialogRef = this.dialog.open(FeedbackComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.getDeliveryPerson();
    this.socket.on('locationUpdated',()=>{
      this.getDeliveryPerson()
    })
  }

/* customize with the order ID*/
  getDeliveryPerson(){
    let orderId='5eff770f7d96fd1aa09f2971'; // get the order id from parent 
    this.userService.getOrder(orderId).subscribe(
      (data)=>{
        console.log('order',data)
        this.Id=data.data.driver;

        this.userService.getDeliveryPersonData(this.Id)
        .subscribe((data)=>{
          console.log('driver:',data);
          this.deliveryPerson=data;
          this.deliveryLat=this.deliveryPerson.data.lat;
          this.deliveryLng=this.deliveryPerson.data.long;
        })
      }
    )

    //set the delivery persons' location
   
  }
}
