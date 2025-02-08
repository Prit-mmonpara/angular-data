import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from './data.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  constructor(private dataService: DataService) {}

  transform(criteria: string, value: string): any[] {
    let result: any[] = [];
    
    switch(criteria) {
      case 'customerId':
        result = this.dataService.getOrdersByCustomer(+value)
        console.log(value);
        console.log(result);
        break;

      // case 'Customer ID':
      //   result = this.dataService.getCustomerDetails(+value)
      //   break;
    }
    
    return result;
  }
}