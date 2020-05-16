import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

/** Custom Services. */
import { UserServiceService } from 'app/Services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuild: FormBuilder,
              private userService: UserServiceService,
              private router: Router,
              private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  /**
   * Create Login Form.
   */
  createLoginForm() {
    this.loginForm = this.formBuild.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }

  /**
   * Submits Login Form.
   */
  submit() {
    const loginForm = this.loginForm.value;
    this.userService.loginUser(loginForm).subscribe(response => {
      if(response.status === 200) this.router.navigate(['../dashboard'], { relativeTo: this.route});
      else throw new Error('Not Successfull');
    })
  }

}
