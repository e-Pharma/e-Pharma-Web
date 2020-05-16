import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

/** Custom Services. */
import { UserServiceService } from 'app/Services/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private FormBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserServiceService
    ) { }

  ngOnInit(): void {
    this.createSignupForm();
  }

  /**
   * Initialize Signup Form.
   */
  createSignupForm() {
    this.signupForm = this.FormBuilder.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required],
      'address': ['', Validators.required],
      'contact': ['', [Validators.required, Validators.pattern('^\\d+$'), Validators.minLength(10), Validators.maxLength(10)]],
      'country': [{value: 'Sri Lanka', disabled: true}, Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$'), Validators.maxLength(50), Validators.minLength(8)]],
      'rePassword': ['', [Validators.required, this.confirmPassword('password')]]
    })
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

  /**
   * Submits Registration Form.
   */
  submit() {
    const registerForm = this.signupForm.value;
    this.userService.registerUser(registerForm).subscribe(response => {
      if (response.status === 200 ) this.router.navigate(['../login'], { relativeTo: this.route} );
      else throw new Error();
    })
  }

}
