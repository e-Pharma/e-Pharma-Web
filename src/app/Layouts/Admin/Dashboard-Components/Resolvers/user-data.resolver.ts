/** Angular Imports */
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

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
  resolve(): Observable<any> {
    return this.userService.getUserData();
  }

}
