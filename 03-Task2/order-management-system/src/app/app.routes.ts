import { Routes } from '@angular/router';
import { FindOrdersComponent } from './find-orders/find-orders.component';
import { FetchCustomerDetailsComponent } from './fetch-customer-details/fetch-customer-details.component';
import { CheckStockAvailabilityComponent } from './check-stock-availability/check-stock-availability.component';
import { ValidateOrderComponent } from './validate-order/validate-order.component';
import { CalculateTotalRevenueComponent } from './calculate-total-revenue/calculate-total-revenue.component';
import { GenerateOrderSummaryComponent } from './generate-order-summary/generate-order-summary.component';
import { FindOrdersByCustomerComponent } from './find-orders-by-customer/find-orders-by-customer.component';
import { FindMissingProductsComponent } from './find-missing-products/find-missing-products.component';
import { BulkUpdateOrderStatusComponent } from './bulk-update-order-status/bulk-update-order-status.component';
import { GridComponent } from './grid/grid.component';
import { AddDataComponent } from './add-data/add-data.component';
export const routes: Routes = [
  { path: 'add-data', component: AddDataComponent },
  { path: 'grid', component: GridComponent},
  { path: 'find-orders', component: FindOrdersComponent },
  { path: 'check-stock-availability', component: CheckStockAvailabilityComponent },
  { path: 'validate-order', component: ValidateOrderComponent },
  { path: 'calculate-total-revenue', component: CalculateTotalRevenueComponent },
  { path: 'generate-order-summary', component: GenerateOrderSummaryComponent },
  { path: 'fetch-customer-details', component: FetchCustomerDetailsComponent },
  { path: 'find-orders-by-customer', component: FindOrdersByCustomerComponent},
  { path: 'find-missing-products', component: FindMissingProductsComponent },
  { path: 'bulk-update-order-status', component: BulkUpdateOrderStatusComponent },
  { path: '', redirectTo: '/find-orders-by-customer', pathMatch: 'full' },
  { path: '**', redirectTo: '/find-orders-by-customer' }
];