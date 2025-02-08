import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-find-orders-by-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './find-orders-by-customer.component.html',
  styleUrls: ['./find-orders-by-customer.component.css']
})
export class FindOrdersByCustomerComponent {
  customerId!: number;
  orders: any[] = [];

  constructor(private dataService: DataService) { }

  onSubmit() {
    if (this.customerId) {
      this.orders = this.dataService.getOrdersByCustomer(this.customerId);
    }
  }
}
