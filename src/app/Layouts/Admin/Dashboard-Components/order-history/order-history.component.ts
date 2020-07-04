import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'contact', 'nic', 'ordered_at','status'];
  orders: any;
  dataSource: any;
  
  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.route.data.subscribe((data: { orders: any }) => {
      this.orders = data.orders.data;
      console.log(this.orders)
      this.dataSource = new MatTableDataSource(this.orders);
      console.log(this.paginator)
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

  viewOrder(id: any) {
    this.router.navigate(['../view-order', id], { relativeTo: this.route });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
