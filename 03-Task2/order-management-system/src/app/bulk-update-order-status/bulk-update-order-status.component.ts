import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-bulk-update-order-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bulk-update-order-status.component.html',
  styleUrls: ['./bulk-update-order-status.component.css']
})

export class BulkUpdateOrderStatusComponent {
  updates: { orderId: number; newStatus: string }[] = [];
  newUpdate: { orderId: number; newStatus: string } = { orderId: 0, newStatus: '' };
  updatedOrders: { orderId: number; status: string }[] = [];

  constructor(private dataService: DataService) {}

  addUpdate() {
    if (this.newUpdate.orderId && this.newUpdate.newStatus) {
      this.updates.push({ ...this.newUpdate });
      this.newUpdate = { orderId: 0, newStatus: '' };
    }
  }

  async onSubmit() {
    if (this.updates.length > 0) {
      try {
        this.updatedOrders = await this.dataService.bulkUpdateOrderStatus(this.updates);
        this.updates = []; // Clear the updates array after processing
      } catch (error) {
        console.error('Error updating orders:', error);
      }
    }
  }
}