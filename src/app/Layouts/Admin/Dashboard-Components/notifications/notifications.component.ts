import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ViewMessageDialogComponent } from '../dialogs/view-message-dialog/view-message-dialog.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notificationData: any;
  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router) {
    this.route.data.subscribe((data: { notifications: any }) => {
      this.notificationData = data.notifications.data.list;
      console.log(this.notificationData)
    });
  }

  ngOnInit(): void {
  }

  viewDetails(orderId: any) {
    const medDetails = this.notificationData.filter(order => order._id === orderId )[0];
    const dialogRef = this.dialog.open(ViewMessageDialogComponent, {
      width: '500px',
      height: 'auto',
      data: {
        medList: medDetails.medicine_list,
        price: medDetails.full_amount,
        _id: medDetails._id
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
