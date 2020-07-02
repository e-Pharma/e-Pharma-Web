/** Angular Imports */
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services. */
import { UserServiceService } from 'app/Services/user-service.service';

/**
 * Order Data data resolver.
 */
@Injectable()
export class OrderTempDataResolver implements Resolve<Object> {

  /**
   * @param {UserService} userService User service.
   */
  constructor(private userService: UserServiceService) {}

  /**
   * Returns the Order data.
   * @returns {Observable<any>}
   */
  resolve(): Observable<any> {
    return this.userService.getOrderTempData();
  }

}
