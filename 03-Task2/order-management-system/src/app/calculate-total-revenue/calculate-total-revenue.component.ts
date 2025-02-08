import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-calculate-total-revenue',
  templateUrl: './calculate-total-revenue.component.html',
  styleUrls: ['./calculate-total-revenue.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CalculateTotalRevenueComponent implements OnChanges {
  @Input() status!: string;
  @Output() revenueCalculated = new EventEmitter<number>();
  totalRevenue: number = 0;

  constructor(private dataService: DataService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['status'] && this.status) {
      this.totalRevenue = this.dataService.calculateTotalRevenue(this.status);
      this.revenueCalculated.emit(this.totalRevenue)
    }
  }
}