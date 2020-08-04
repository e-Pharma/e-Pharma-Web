import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notificationData: any;
  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.route.data.subscribe((data: { notifications: any }) => {
      this.notificationData = data.notifications.data.list;
      console.log(this.notificationData)
    });
  }

  ngOnInit(): void {
  }

}
