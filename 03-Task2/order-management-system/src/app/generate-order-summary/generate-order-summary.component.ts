import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-generate-order-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generate-order-summary.component.html',
  styleUrls: ['./generate-order-summary.component.css']
})
export class GenerateOrderSummaryComponent {
  orderId!: number;
  orderSummary: any = null;

  constructor(private dataService: DataService) { }

  onSubmit() {
    if (this.orderId) {
      this.orderSummary = this.dataService.generateOrderSummary(this.orderId);
    }
  }
}
