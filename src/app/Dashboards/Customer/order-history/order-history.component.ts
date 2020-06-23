import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  position: number;
  dateOfOrder: number;
  orderRef:string;
  netTotal: string;
  status:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, orderRef: 'Hydrogen', dateOfOrder: 1.0079, netTotal: 'H',status:'Copmlete'},
  {position: 2, orderRef: 'Helium', dateOfOrder: 4.0026, netTotal: 'He',status:'canceled'},
 
];

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {
  displayedColumns: string[] = ['position', 'orderRef', 'dateOfOrder', 'netTotal','status'];
  dataSource = ELEMENT_DATA;
}


