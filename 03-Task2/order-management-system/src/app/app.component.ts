import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalculateTotalRevenueComponent } from './calculate-total-revenue/calculate-total-revenue.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, CalculateTotalRevenueComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'order-management-system';
  showRevenue: boolean = false;
  status: string = '';
  totalRevenue: number = 0;

  onClick() {
    this.status = 'Delivered'; // Set the status to Delivered
    this.showRevenue = !this.showRevenue; // Show the revenue component
  }

  handleRevenueCalculated(revenue: number) { 
    this.totalRevenue = revenue; // Update totalRevenue in the parent component 
  }
}