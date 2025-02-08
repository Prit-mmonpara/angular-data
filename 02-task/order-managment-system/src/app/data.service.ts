import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = {
    orders: [
      { orderId: 101, customerId: 1, products: [{ productId: 201, quantity: 2 }, { productId: 202, quantity: 1 }], status: 'Pending' },
      { orderId: 102, customerId: 2, products: [{ productId: 203, quantity: 3 }], status: 'Shipped' }
    ],
    customers: [
      { customerId: 1, name: 'Alice', email: 'alice@example.com' },
      { customerId: 2, name: 'Bob', email: 'bob@example.com' }
    ],
    products: [
      { productId: 201, name: 'Laptop', price: 1000, stock: 5 },
      { productId: 202, name: 'Mouse', price: 50, stock: 0 },
      { productId: 203, name: 'Keyboard', price: 80, stock: 10 }
    ]
  };

  getOrdersByCustomer(customerId: number) {
    return this.data.orders.filter(order => order.customerId === customerId);
  }

  getCustomerDetails(orderId: number) {
    const order = this.data.orders.find(order => order.orderId === orderId);
    if (order) {
      return this.data.customers.find(customer => customer.customerId === order.customerId);
    }
    return null;
  }

  checkStockAvailability(orderId: number) {
    const order = this.data.orders.find(order => order.orderId === orderId);
    if (order) {
      return order.products.every(product => {
        const productDetails = this.data.products.find(p => p.productId === product.productId);
        return productDetails && product.quantity <= productDetails.stock;
      });
    }
    return false;
  }

  validateOrder(orderId: number) {
    const order = this.data.orders.find(order => order.orderId === orderId);
    if (!order) {
      throw new Error(`Order ID ${orderId} not found.`);
    }
    const missingProducts = order.products.filter(product => {
      return !this.data.products.some(p => p.productId === product.productId);
    });
    if (missingProducts.length > 0) {
      throw new Error(`Some products in order ID ${orderId} are missing in the product list.`);
    }
  }

  calculateTotalRevenue() {
    return this.data.orders
      .filter(order => order.status === 'Delivered')
      .reduce((total, order) => {
        const orderTotal = order.products.reduce((sum, product) => {
          const productDetails = this.data.products.find(p => p.productId === product.productId);
          return sum + (productDetails ? product.quantity * productDetails.price : 0);
        }, 0);
        return total + orderTotal;
      }, 0);
  }

  generateOrderSummary(orderId: number) {
    const order = this.data.orders.find(order => order.orderId === orderId);
    if (!order) return null;

    const customer = this.getCustomerDetails(orderId);
    const products = order.products.map(product => {
      const productDetails = this.data.products.find(p => p.productId === product.productId);
      return {
        name: productDetails?.name,
        quantity: product.quantity,
        price: productDetails?.price
      };
    });
    const totalValue = products.reduce((total, product) => total + (product.price || 0) * product.quantity, 0);

    return {
      orderId: order.orderId,
      customer,
      products,
      totalValue
    };
  }

  async bulkUpdateOrderStatus(updates: { orderId: number, newStatus: string }[]) {
    const updatedOrders = await Promise.all(updates.map(async (update) => {
      const order = this.data.orders.find(order => order.orderId === update.orderId);
      if (order) {
        order.status = update.newStatus;
      }
      return order;
    }));
    return updatedOrders;
  }
}
