import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {ProfileService} from '../profile/profile.service'
import {UserServiceService} from '../../../../Services/user-service.service'

export interface UserInfo{
  email:string,
  fName:string,
  lName:string,
  role:string,
  permission_level:number,
  contact_number:string,
  nic:string,
  address:string,
  registered_at:Date,
  relations:any
  
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails :any=[];
  // UserInfo[]=[
 

  constructor(private userService:UserServiceService) {
    this.readUserDetails();

   }

   readUserDetails(){
    this.userService.getUser()
        .subscribe((data)=>{
          console.log(data);
          this.userDetails=data;
          // console.log(this.userDetails.data.email)
        })

   }
  ngOnInit(): void {
    // this.userDetails=this.userService.getUser();

  }

}
