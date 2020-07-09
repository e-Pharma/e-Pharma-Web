import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-contact',
  templateUrl: './customer-contact.component.html',
  styleUrls: ['./customer-contact.component.css']
})
export class CustomerContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var tab = document.getElementById('contact');
    console.log(tab);
    tab.className += " active";
    document.getElementById('home').classList.remove('active');
    document.getElementById('about').classList.remove('active');
  }

}
