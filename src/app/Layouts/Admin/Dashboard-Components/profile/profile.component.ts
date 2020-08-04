import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {ProfileService} from '../profile/profile.service'
import {UserServiceService} from '../../../../Services/user-service.service'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails :any=[];
  userId =''
  constructor(
    private userService:UserServiceService,
    private route:ActivatedRoute
    ) 
  {
    this.readUserDetails();
   }


  ngOnInit(): void {
 
  }
  readUserDetails(){
    this.userId = this.route.snapshot.params.id;
    console.log(this.userId);

    this.userService.getUser(this.userId)
        .subscribe((data)=>{
          console.log(data);
          this.userDetails=data;
          // console.log(this.userDetails.data.email)
        })
   }
}
