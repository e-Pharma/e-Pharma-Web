import { Component, OnInit, Input } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  // @Input() userData: any;

  // name: FormControl;

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }
  constructor() { }

  ngOnInit(): void {
    // console.log(this.userData.data.email);
    //this.email = new FormControl(this.userData.data.email, [Validators.required, Validators.email]);
  }

}
