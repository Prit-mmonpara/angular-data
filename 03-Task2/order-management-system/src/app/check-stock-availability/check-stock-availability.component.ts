import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-check-stock-availability',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './check-stock-availability.component.html',
  styleUrls: ['./check-stock-availability.component.css']
})
export class CheckStockAvailabilityComponent {
  orderId!: number;
  stockAvailable!: boolean;

  constructor(private dataService: DataService) { }

  onSubmit() {
    if (this.orderId) {
      this.stockAvailable = this.dataService.checkStockAvailability(this.orderId);
    }
  }
}