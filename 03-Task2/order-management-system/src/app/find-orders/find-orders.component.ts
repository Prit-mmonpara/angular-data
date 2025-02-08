import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-find-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './find-orders.component.html',
  styleUrls: ['./find-orders.component.css']
})
export class FindOrdersComponent {
  customerId!: number;
  orders: any[] = [];
  
  constructor(private dataService: DataService) { }

  onSubmit() {
    if (this.customerId) {
      this.orders = this.dataService.getOrdersByCustomer(this.customerId);
    }
  }
}
