import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {UserServiceService} from '../../Services/user-service.service'

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

let userId='5eff0dbb44376c5f074aaa63';

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard-home', title: 'Dashboard-Home',  icon: 'dashboard', class: '' },
    { path: '/address-book', title: 'Address Book',  icon:'contacts', class: '' },
    { path: '/family', title: 'Family',  icon:'add_circle', class: '' },
    { path: '/history', title: 'History',  icon:'history', class: '' },
    { path: '/profile/'+userId, title: 'User Profile',  icon:'person', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  userId:any;

  constructor(
    private user:UserServiceService,
    private route:ActivatedRoute) {}
 
  ngOnInit() {
    userId='5eff0dbb44376c5f074aaa63'
    // this.route.snapshot.params.id;
    // console.log('id of user',this.route)
    this.menuItems = ROUTES.filter(menuItem => menuItem);

  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
