import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../search.pipe';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchPipe],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})

export class GridComponent {
  searchCriteria: string = 'customerId'; 
  searchText: string = ''; 
  searchResults: any[] = []; 
  columns: string[] = ['orderId', 'customerId', 'status']; 
  searchPipe: any;
  constructor(private dataService: DataService) { } 
  
  orders!: any[];
  customers!: any[];
  products!: any[];

  onSearch() { 
    //this.searchResults = this.dataService.getOrders().filter(order => order[this.searchCriteria].toString().toLowerCase().includes(this.searchText.toLowerCase()) ); 
      this.customers = this.searchPipe.transform(this.searchCriteria, this.searchText)
  }
}