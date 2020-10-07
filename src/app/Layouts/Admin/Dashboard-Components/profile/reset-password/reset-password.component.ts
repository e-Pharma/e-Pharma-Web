import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'app/Services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

 
  resetPasswordForm: FormGroup;
  token: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private _snackBar: MatSnackBar,
              private userService: UserServiceService,
              private route: ActivatedRoute) {
    this.token = this.route.snapshot.params['token'];
  }

  ngOnInit(): void {
    this.setResetPasswordForm();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  setResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      'password': ['', [Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$'), Validators.maxLength(50), Validators.minLength(8)]],
      'rePassword': ['', [Validators.required, this.confirmPassword('password')]]
    });
  }

  /**
   * Confirm Change Password of Users.
   * @param controlNameToCompare Form Control Name to be compared.
   */
  confirmPassword(controlNameToCompare: string): ValidatorFn {
    return (c: AbstractControl): ValidationErrors|null => {
        if (c.value == null || c.value.length === 0) {
            return null;
        }
        const controlToCompare = c.root.get(controlNameToCompare);
        if (controlToCompare) {
            const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
                c.updateValueAndValidity();
                subscription.unsubscribe();
            });
        }
        return controlToCompare && controlToCompare.value !== c.value ? {'notequal': true} : null;
    };
  }

  submit() {
    const resetPasswordForm = this.resetPasswordForm.value;
    this.userService.resetPassword(resetPasswordForm, this.token).subscribe((response: any) => {
      if(response.status === 200) {
        this.openSnackBar(response.message, "OK");
        this.router.navigate(['../../login'], { relativeTo: this.route });
      } else {
        this.openSnackBar(response.message, "OK");
      }
    })
  }
}
