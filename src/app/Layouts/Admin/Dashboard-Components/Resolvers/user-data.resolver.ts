/** Angular Imports */
import { Injectable } from '@angular/core';
import { Resolve,ActivatedRouteSnapshot } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services. */
import { UserServiceService } from 'app/Services/user-service.service';

/**
 * User Data data resolver.
 */
@Injectable()
export class UserDataResolver implements Resolve<Object> {

  /**
   * @param {UserService} userService User service.
   */
  constructor(private userService: UserServiceService) {}

  /**
   * Returns the user data.
   * @returns {Observable<any>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const userId=route.paramMap.get('id');
    console.log(userId)

    return this.userService.getUserData();
  }

}
