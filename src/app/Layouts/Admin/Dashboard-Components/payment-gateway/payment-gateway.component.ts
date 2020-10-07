import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'app/Services/user-service.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {

  order: any;

  constructor(private route: ActivatedRoute,
              private userService: UserServiceService,
              private router: Router) {
    this.route.data.subscribe((data: { order: any }) => {
      this.order = data.order.data;
      console.log(this.order)
    });
  }

  ngOnInit(): void {
    
  }

  getName(type:string) {
    if (type === 'first') {
      return this.order.name.split(" ")[0];
    } else {
      return this.order.name.split(" ")[1];
    }
  }

  getItems() {
    if (this.order.non_prescription.length === 0) {
      return "Prescription";
    } else if (this.order.non_prescription.length > 0 && (this.order.prescription_url !== null || this.order.prescription_url !== "")) {
      var medicine: string = "";
      for (var item of this.order.non_prescription) {
        medicine += item + ",";
      }
      medicine += "prescribed medicines";
      return medicine;
    } else if (this.order.non_prescription.length === 0 && (this.order.prescription_url !== null || this.order.prescription_url !== "")) {
      return "Prescrbed Medicines"
    }
  }

  pay() {
    this.userService.payOrder(this.order._id).subscribe((response: any) => {
      if(response.message === "Success") {
        alert(response.message);
        (<HTMLFormElement>document.getElementById('form')).submit();
        this.router.navigate(['../../track'], { relativeTo: this.route });
      } else {
        alert(response.message);
      }
    })
  }

}
