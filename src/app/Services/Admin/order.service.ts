import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from 'app/shared/order';
import { ORDERS } from 'app/shared/orders';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  getOrders(): Observable<Order[]> {
    // return new Promise((resolve) => {
    //   setTimeout(() => resolve(DISHES), 2000);
    // });
    return of(ORDERS).pipe(delay(2000));
  }
}
