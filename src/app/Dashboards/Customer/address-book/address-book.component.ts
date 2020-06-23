import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit {

  newAddress = ' ';
  inputValue=' ';

  addNewAddress() {
    this.newAddress=this.inputValue;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
