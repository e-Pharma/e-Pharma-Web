import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

/** Custom Services. */
import { UserServiceService } from 'app/Services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hasError: string = null;

  constructor(private formBuild: FormBuilder,
              private userService: UserServiceService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  /**
   * Open Snack Bar.
   * @param message Message.
   * @param action Action.
   */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
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
    console.log(loginForm)
    this.userService.loginUser(loginForm).subscribe(response => {
      if(response.message === "Success") {
        this.openSnackBar(response.message, "OK");
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expiresAt', response.data.expireDate);
        this.router.navigate(['../dashboard-home'], { relativeTo: this.route});
      } else {
        this.hasError = response.message;
        this.loginForm.get('password').setValue(null);
        this.openSnackBar(response.message, "OK");
      }
    })
  }

}
