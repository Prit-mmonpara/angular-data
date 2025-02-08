import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-find-missing-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './find-missing-products.component.html',
  styleUrls: ['./find-missing-products.component.css']
})
export class FindMissingProductsComponent {
  orderId!: number;
  missingProducts: number[] = [];

  constructor(private dataService: DataService) { }

  onSubmit() {
    if (this.orderId) {
      this.missingProducts = this.dataService.findMissingProducts(this.orderId);
    }
  }
}
