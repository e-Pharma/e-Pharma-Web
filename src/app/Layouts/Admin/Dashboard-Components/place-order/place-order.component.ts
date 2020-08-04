import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { UserServiceService } from 'app/Services/user-service.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  orderData: any;
  paymentMethods: any[] = [{name: 'Cash On Delivery', value: 'c_del'}, {name: 'Pay Here', value: 'p_here'}];
  paymentMethod: FormControl;
  orderId: any;

  constructor(private router: Router,
              private userService: UserServiceService,
              private route: ActivatedRoute) {
    this.route.data.subscribe((data: { order: any }) => {
      this.orderData = data.order.data;
      console.log(this.orderData)
    });
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    console.log(this.orderId)
    this.paymentMethod = new FormControl();
    //this.selectOnChange();
  }

  selectOnChange() {
    this.paymentMethod.valueChanges.subscribe((value: any) => {
      console.log(value)
    })
  }

  displayMedicines() {
    var medString: string = "";
    for(var medicines of this.orderData.non_prescription) {
      medString = medString + medicines + " , "
    }
    return medString;
  }

  cancelOrder() {
    this.userService.cancelOrder(this.orderId).subscribe((response: any) => {
      if (response.message === "success") {
        this.router.navigate(['../../dashboard-home'], {relativeTo: this.route});
      } else {
        alert(response.message)
      }
    });
  }

}
