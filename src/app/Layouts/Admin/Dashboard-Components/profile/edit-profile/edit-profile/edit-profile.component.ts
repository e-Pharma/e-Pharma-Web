import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ProfileService} from '../../profile.service'
import {UserServiceService} from '../../../../../../Services/user-service.service'
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  userDetails:any =[];
  userId='';
  // @Input() public profileData:any=[];
  @Output() public updateEvent:EventEmitter<any> = new EventEmitter<any>() ;


  constructor( 
    private userService :UserServiceService,
    // private profileService:ProfileService,
    private route:ActivatedRoute,
    private _snackBar: MatSnackBar
    ) { 
    this.readUserDetails()
    // this.editUserDetaisl();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
        duration: 2000,
    });
  }
  ngOnInit(): void {

  }
   readUserDetails(){
    this.userId = this.route.snapshot.params.id;
    console.log(this.userId);

    this.userService.getUser(this.userId)
        .subscribe((data)=>{
          // console.log(data);
          this.userDetails=data;
          console.log(this.userDetails.data.nic)
        })
   }

   editUserDetails(userfName,userlName,userAddress,userContact){
     this.userDetails=[userfName,userlName,userAddress,userContact]

     this.route.params.subscribe(params=>{
      this.userService.editProfile(params['id'],userfName,userlName,userAddress,userContact)
        .subscribe(res=>{
          console.log(res)
          this.userDetails=[userfName,userlName,userlName,userAddress];
          this.updateEvent.emit(this.userDetails);
          this.openSnackBar("Profile updated successfully","OK");
          // this.readUserDetails()
        })
    })
  }

}
