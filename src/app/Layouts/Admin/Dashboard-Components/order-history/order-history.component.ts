import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{
  displayedColumns: string[] = ['name', 'contact', 'nic', 'ordered_at','status'];
  orders: any;
  dataSource: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.route.data.subscribe((data: { orders: any }) => {
      this.orders = data.orders.data;
      console.log(this.orders)
      this.dataSource = new MatTableDataSource(this.orders);
    });
  }
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  getCamelCase(word: string) {
    if(word === null) {
      return word;
    } else {
      return word[0].toUpperCase() + word.slice(1);
    }
  }

}
