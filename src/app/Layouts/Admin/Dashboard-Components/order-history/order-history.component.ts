import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  position: number;
  dateOfOrder: string;
  orderRef:string;
  netTotal: string;
  status:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, orderRef: 'Hydrogen', dateOfOrder: '22/02/2020', netTotal: 'H',status:'Complete'},
  {position: 2, orderRef: 'Helium', dateOfOrder: '23/5/2019', netTotal: 'He',status:'Canceled'},
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


