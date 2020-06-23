import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  mobile: number;
  relationship: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', mobile: 1.0079, relationship: 'Mother'},
  { name: 'Helium', mobile: 4.0026, relationship: 'Granny'},
 
];
@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent  {
  newMember = ' ';
  inputValue=' ';

  addNewMember() {
    this.newMember=this.inputValue;
  }
 
  displayedColumns: string[] = [ 'name', 'mobile', 'relationship'];
  dataSource = ELEMENT_DATA;

}
