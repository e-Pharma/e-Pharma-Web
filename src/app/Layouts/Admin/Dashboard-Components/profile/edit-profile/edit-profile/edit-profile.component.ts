import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ProfileService} from '../../profile.service'
import {UserServiceService} from '../../../../../../Services/user-service.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  // email = new FormControl('', [Validators.required, Validators.email]);
 
  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  userDetails:any =[]
  userId=''
  
  constructor( 
    private userService :UserServiceService,
    // private profileService:ProfileService,
    private route:ActivatedRoute,
    ) { 
    this.readUserDetails()
    // this.editUserDetaisl();
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

   editUserDetails(userfName,userlName,userAddress,userContact){
     console.log('username')
     console.log(userfName)
    this.route.params.subscribe(params=>{
      this.userService.editProfile(params['id'],userfName,userlName,userAddress,userContact)
        .subscribe(res=>{
          console.log(res)
          this.userDetails=res;
          this.readUserDetails()
        })
    })
  }

}
