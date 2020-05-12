import { Component, OnInit } from "@angular/core";
import { OrderService } from "app/Services/Admin/order.service";
import { Order } from "app/shared/order";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
  orders: Order[];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders) => (this.orders = orders));
  }
}
