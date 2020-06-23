import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  type: string;
  city: string;
  address: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { type: 'Hydrogen', city: 'colombo3', address: 'xxxxxxxxxxxx'},
  { type: 'Helium', city: 'kohuwela', address: 'xxxxxxxxxxxxxx'},
 
];
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

  displayedColumns: string[] = [ 'type', 'city', 'address'];
  dataSource = ELEMENT_DATA;
}
