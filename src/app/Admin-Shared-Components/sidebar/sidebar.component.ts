import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard-home', title: 'Dashboard-Home',  icon: 'dashboard', class: '' },
    { path: '/address-book', title: 'Adress Book',  icon:'contacts', class: '' },
    { path: '/family', title: 'Family',  icon:'add_circle', class: '' },
    { path: '/history', title: 'History',  icon:'history', class: '' },
    { path: '/profile', title: 'User Profile',  icon:'person', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
