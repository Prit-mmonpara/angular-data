import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent {
  newCustomer = { customerId: 0, name: '', email: '' };
  newProduct = { productId: 0, name: '', price: 0, stock: 0 };
  newOrder = { orderId: 0, customerId: 0, products: [{ productId: 0, quantity: 0 }], status: '' };

  customerErrorMessage: string | null = null;
  customerSuccessMessage: string | null = null;

  productErrorMessage: string | null = null;
  productSuccessMessage: string | null = null;

  orderErrorMessage: string | null = null;
  orderSuccessMessage: string | null = null;

  constructor(private dataService: DataService) {}

  addCustomer() {
    if (this.validateCustomer(this.newCustomer)) {
      try {
        this.customerSuccessMessage = this.dataService.addCustomer(this.newCustomer);
        this.customerErrorMessage = null;
        this.newCustomer = { customerId: 0, name: '', email: '' };
      } catch (error: any) {
        this.customerErrorMessage = error.message;
        this.customerSuccessMessage = null;
      }
    }
  }                                                                                                                 

  validateCustomer(customer: { customerId: number; name: string; email: string }): boolean {
    if (!customer.customerId || !customer.name || !customer.email) {
      this.customerErrorMessage = 'All fields are required for adding a customer.';
      return false;
    }
    if (!this.validateEmail(customer.email)) {
      this.customerErrorMessage = 'Invalid email address.';
      return false;
    }
    return true;
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  addProduct() {
    if (this.validateProduct(this.newProduct)) {
      try {
        this.productSuccessMessage = this.dataService.addProduct(this.newProduct);
        this.productErrorMessage = null;
        this.newProduct = { productId: 0, name: '', price: 0, stock: 0 };
      } catch (error: any) {
        this.productErrorMessage = error.message;
        this.productSuccessMessage = null;
      }
    }
  }

  validateProduct(product: { productId: number; name: string; price: number; stock: number }): boolean {
    if (!product.productId || !product.name || product.price <= 0 || product.stock < 0) {
      this.productErrorMessage = 'All fields are required and must have valid values for adding a product.';
      return false;
    }
    return true;
  }

  addOrder() {
    if (this.validateOrder(this.newOrder)) {
      try {
        this.orderSuccessMessage = this.dataService.addOrder(this.newOrder);
        this.orderErrorMessage = null;
        this.newOrder = { orderId: 0, customerId: 0, products: [{ productId: 0, quantity: 0 }], status: '' };
      } catch (error: any) {
        this.orderErrorMessage = error.message;
        this.orderSuccessMessage = null;
      }
    }
  }

  validateOrder(order: { orderId: number; customerId: number; products: { productId: number; quantity: number }[]; status: string }): boolean {
    if (!order.orderId || !order.customerId || !order.status || order.products.length === 0) {
      this.orderErrorMessage = 'All fields are required for adding an order.';
      return false;
    }
    for (const product of order.products) {
      if (!product.productId || product.quantity <= 0) {
        this.orderErrorMessage = 'Product ID and quantity must have valid values.';
        return false;
      }
    }
    return true;
  }

  addProductToOrder() {
    this.newOrder.products.push({ productId: 0, quantity: 0 });
  }

  removeProductFromOrder(index: number) {
    this.newOrder.products.splice(index, 1);
  }
}
