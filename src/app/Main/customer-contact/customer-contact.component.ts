import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-customer-contact',
  templateUrl: './customer-contact.component.html',
  styleUrls: ['./customer-contact.component.css']
})
export class CustomerContactComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    var tab = document.getElementById('contact');
    console.log(tab);
    tab.className += " active";
    document.getElementById('home').classList.remove('active');
    document.getElementById('about').classList.remove('active');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
        duration: 2000,
    });
    }

  sendEmail(){
    this.openSnackBar('Email Sent','OK');


  }
}
