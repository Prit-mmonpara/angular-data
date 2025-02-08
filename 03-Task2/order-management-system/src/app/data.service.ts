import { Injectable } from '@angular/core';

interface Product {
  productId: number;
  name: string;
  price: number;
  stock: number;
}

interface OrderProduct {
  productId: number;
  quantity: number;
}

interface Order {
  orderId: number;
  customerId: number;
  products: OrderProduct[];
  status: string;
}

interface Customer {
  customerId: number;
  name: string;
  email: string;
}

interface Data {
  orders: Order[];
  customers: Customer[];
  products: Product[];
}

@Injectable({
  providedIn: 'root',
})

export class DataService {
  private data: Data = {
    orders: [
      {
        orderId: 101,
        customerId: 1,
        products: [
          { productId: 201, quantity: 2 },
          { productId: 202, quantity: 1 },
        ],
        status: 'Delivered',
      },
      {
        orderId: 102,
        customerId: 2,
        products: [{ productId: 203, quantity: 3 }],
        status: 'Shipped',
      },
    ],
    customers: [
      { customerId: 1, name: 'Alice', email: 'alice@example.com' },
      { customerId: 2, name: 'Bob', email: 'bob@example.com' },
    ],
    products: [
      { productId: 201, name: 'Laptop', price: 1000, stock: 5 },
      { productId: 202, name: 'Mouse', price: 50, stock: 0 },
      { productId: 203, name: 'Keyboard', price: 80, stock: 10 },
    ],
  };

  addCustomer(customer: Customer): string {
    if (this.data.customers.some((c) => c.customerId === customer.customerId)) {
      throw new Error('Customer already exists');
    }
    this.data.customers.push(customer);
    console.log('Customer added:', customer);
    console.log('Updated customer data:', this.data.customers);
    return 'Customer added successfully';
  }
  

  addProduct(product: Product): string {
    if (this.data.products.some((p) => p.productId === product.productId)) {
      throw new Error ('Product already exists');
    }
    this.data.products.push(product);
    console.log('Product added:', product);
    console.log('Updated product data:', this.data.products);
    return 'Product added successfully';
  }

  addOrder(order: Order): string {
    if (this.data.orders.some((o) => o.orderId === order.orderId)) {
      throw new Error ('Order already exists');
    }
    
    this.data.orders.push(order);
    console.log('Order added:', order);
    console.log('Updated order data:', this.data.orders);
    return 'Order added successfully';
  }

  getOrdersByCustomer(customerId: number) {
    console.log(this.data);
    return this.data.orders.filter((order) => order.customerId === customerId);
  }

  getCustomerDetails(orderId: number) {
    const order = this.data.orders.find((order) => order.orderId === orderId);
    if (order) {
      return this.data.customers.find(
        (customer) => customer.customerId === order.customerId
      );
    }
    return null;
  }

  checkStockAvailability(orderId: number) {
    const order = this.data.orders.find((order) => order.orderId === orderId);
    if (order) {
      return order.products.every((product) => {
        const productDetails = this.data.products.find(
          (p) => p.productId === product.productId
        );
        return productDetails && product.quantity <= productDetails.stock;
      });
    }
    return false;
  }

  validateOrder(orderId: number) {
    const order = this.data.orders.find((order) => order.orderId === orderId);
    if (!order) {
      throw new Error(`Order ID ${orderId} not found.`);
    }
    const missingProducts = order.products.filter((product) => {
      return !this.data.products.some((p) => p.productId === product.productId);
    });
    if (missingProducts.length > 0) {
      throw new Error(
        `Some products in order ID ${orderId} are missing in the product list.`
      );
    }
  }

  calculateTotalRevenue(status: string) {
    return this.data.orders
      .filter(order => order.status === status)
      .reduce((total, order) => {
        const orderTotal = order.products.reduce((sum, product) => {
          const productDetails = this.data.products.find(p => p.productId === product.productId);
          return sum + (productDetails ? product.quantity * productDetails.price : 0);
        }, 0);
        return total + orderTotal;
      }, 0);
  }  
  

  generateOrderSummary(orderId: number) {
    const order = this.data.orders.find((order) => order.orderId === orderId);
    if (!order) return null;

    const customer = this.getCustomerDetails(orderId);
    const products = order.products.map((product) => {
      const productDetails = this.data.products.find(
        (p) => p.productId === product.productId
      );
      return {
        name: productDetails?.name,
        quantity: product.quantity,
        price: productDetails?.price,
      };
    });
    const totalValue = products.reduce(
      (total, product) => total + (product.price || 0) * product.quantity,
      0
    );

    return {
      orderId: order.orderId,
      customer,
      products,
      totalValue,
    };
  }

  findMissingProducts(orderId: number): number[] {
    let productIds: number[] = [];
    let result: number[] = [];

    const order = this.data.orders.find((order) => order.orderId === orderId);
    if (!order) return [];

    order.products.forEach((product) => {
      productIds.push(product.productId);
    });

    this.data.products.forEach((product) => {
      if (!productIds.includes(product.productId)) {
        result.push(product.productId);
      }
    });
    return result;
  }

  async bulkUpdateOrderStatus(
    updates: { orderId: number; newStatus: string }[]
  ): Promise<{ orderId: number; status: string }[]> {
    const updatedOrders: { orderId: number; status: string }[] = [];
  
    for (const update of updates) {
      const order = this.data.orders.find(
        (order) => order.orderId === update.orderId
      );
      if (order) {
        order.status = update.newStatus;
        updatedOrders.push({ orderId: update.orderId, status: update.newStatus });
      } else {
        updatedOrders.push({ orderId: update.orderId, status: 'Order Not Found' });
      }
    }
  
    return updatedOrders;
  }
  
}
