import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  mobile: number;
  relationship: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // { name: 'Hydrogen', mobile: 071258649, relationship: 'Mother'},
  // { name: 'Helium', mobile: 072589648, relationship: 'Granny'},
 
];
@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})

export class FamilyComponent  {
  constructor() {}

  displayedColumns: string[] = [ 'name', 'mobile', 'relationship'];
  dataSource = ELEMENT_DATA;

}
