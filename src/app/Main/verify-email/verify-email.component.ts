import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'app/Services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  token: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private userService: UserServiceService) {
    this.token = this.route.snapshot.params['token'];
    console.log(this.token);
  }

  ngOnInit(): void {
    this.updateVerification();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  updateVerification() {
    this.userService.updateVerification(this.token).subscribe((response: any) => {
      if(response.status === 200) {
        this.openSnackBar(response.message, "OK");
        this.router.navigate(['../../login'], { relativeTo: this.route });
      } else {
        this.openSnackBar(response.message, "OK");
      }
    })
  }

}
