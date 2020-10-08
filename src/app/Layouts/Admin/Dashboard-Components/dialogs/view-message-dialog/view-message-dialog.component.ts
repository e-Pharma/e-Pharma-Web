import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-message-dialog',
  templateUrl: './view-message-dialog.component.html',
  styleUrls: ['./view-message-dialog.component.css']
})
export class ViewMessageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  availability(isAvailable: boolean, index: any) {
    const _id = "availability"+index;
    if (isAvailable) {
      (<HTMLElement>document.getElementById(_id)).style.color = "green";
      return "AVAILABLE"
    } else {
      (<HTMLElement>document.getElementById(_id)).style.color = "red";
      return "UN-AVAILABLE"
    }
  }

  toUpperCase(text: string){
    return text.toUpperCase();
  }

  navigateToPayment() {
    this.router.navigate(['../view-order', this.data._id], {relativeTo: this.route});
  }

}
