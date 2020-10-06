/** Angular Imports */
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services. */
import { UserServiceService } from 'app/Services/user-service.service';

/**
 * Notifications Data resolver.
 */
@Injectable()
export class AddressResolver implements Resolve<Object> {

  /**
   * @param {UserService} userService User service.
   */
  constructor(private userService: UserServiceService) {}

  /**
   * Returns the Address data.
   * @returns {Observable<any>}
   */
  resolve(): Observable<any> {
    return this.userService.getAddressBook();
  }

}
