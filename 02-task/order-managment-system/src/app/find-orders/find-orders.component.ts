import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-find-orders',
  templateUrl: './find-orders.component.html',
  styleUrls: ['./find-orders.component.css'],
  standalone: true
})
export class FindOrdersComponent {
  customerId!: number
  orders: any[] = [];

  constructor(private dataService: DataService) { }

  onSubmit() {
    if (this.customerId) {
      this.orders = this.dataService.getOrdersByCustomer(this.customerId);
    }
  }
}
