import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any;
  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.route.data.subscribe((data: { userData: any }) => {
      this.userData = data.userData;
    })
  }

  ngOnInit(): void {
  }

}
