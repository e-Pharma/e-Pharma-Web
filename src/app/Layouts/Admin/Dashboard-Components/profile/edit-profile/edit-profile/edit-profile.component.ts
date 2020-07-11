import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  userDetails:any =[]

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  constructor( private userService :ProfileService) { 
    this.readUserDetails()
  }

  ngOnInit(): void {
  }

  readUserDetails(){
    this.userService.getUser()
      .subscribe((data)=>{
        console.log(data);
        this.userDetails=data;
        
      })
  }

}
