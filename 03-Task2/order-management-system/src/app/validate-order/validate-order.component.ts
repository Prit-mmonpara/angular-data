import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-validate-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './validate-order.component.html',
  styleUrls: ['./validate-order.component.css']
})
export class ValidateOrderComponent {
  orderId!: number;
  validationResult!: string;

  constructor(private dataService: DataService) { }

  onSubmit() {
    try {
      if (this.orderId) {
        this.dataService.validateOrder(this.orderId);
        this.validationResult = `Order ID ${this.orderId} is valid.`;
      }
    } catch (error) {
      this.validationResult = "Error";
    }
  }
}
