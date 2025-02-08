import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-fetch-customer-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fetch-customer-details.component.html',
  styleUrls: ['./fetch-customer-details.component.css']
})
export class FetchCustomerDetailsComponent {
  orderId!: number;
  customer: any = null;

  constructor(private dataService: DataService) { }

  onSubmit() {
    if (this.orderId) {
      this.customer = this.dataService.getCustomerDetails(this.orderId);
    }
  }
}
