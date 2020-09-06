import { Component, OnInit } from '@angular/core';
import{ UserServiceService}from '../../../../Services/user-service.service'
import * as io from 'socket.io-client'

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
      width: 30,
      height: 30 
    }
}

/*Delivery Paerson Data*/
  deliveryPerson:any =[];
  deliveryLat:Number;
  deliveryLng:Number;
  driverIcon = {
    url: 'https://jillyscarwash.com/wp-content/uploads/2018/09/jillys-marker-map-pin-300x300.png',
    scaledSize: {
      width: 30,
      height: 30 
    }
} 
 
  constructor(public userService:UserServiceService) { 
    this.getDeliveryPerson();
    this.socket=io('http://localhost:3000');

  }

  ngOnInit(): void {
    this.getDeliveryPerson();
    this.socket.on('locationUpdated',()=>{
      this.getDeliveryPerson()
    })
  }

/* customize with the order ID*/
  getDeliveryPerson(){
    this.userService.getDeliveryPersonData()
      .subscribe((data)=>{
        console.log('driver:',data);
        this.deliveryPerson=data;
        this.deliveryLat=this.deliveryPerson.data[0].lat;
        this.deliveryLng=this.deliveryPerson.data[0].long;
       
      })
  }

}
