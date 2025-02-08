import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { EditService } from '../edit.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})

export class EditComponent {

  products: any[] = [];
  constructor(private dataService : DataService) {
    this.products = this.dataService
  } 


}
