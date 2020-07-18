import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-about-us',
  templateUrl: './customer-about-us.component.html',
  styleUrls: ['./customer-about-us.component.css']
})
export class CustomerAboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var tab = document.getElementById('about');
    console.log(tab);
    tab.className += " active";
    document.getElementById('home').classList.remove('active');
    document.getElementById('contact').classList.remove('active');
  }

}
