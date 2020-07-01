import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {

  constructor(private router: Router){}
  canActivate(){
    console.log(localStorage.getItem('expiresAt'))
    if(localStorage.getItem('token') !== null && (parseInt(localStorage.getItem('expiresAt')) >= new Date().getTime())) {
      return true
    } else {
      return true

      // this.router.navigate(['../login']);
    }
  }

}
