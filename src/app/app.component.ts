import { Component } from '@angular/core';
import { ClientListService } from './shared/services/client-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client-list';
  products = [
    { code: 'f230fh0g3', name: 'Bamboo Watch', category: 'Accessories', quantity: '24' },
    { code: 'f230fh0g3', name: 'Black Watch', category: 'Fitness', quantity: '3' },
    { code: 'f230fh0g3', name: 'Blue Band', category: 'Clothing', quantity: '42' },
    { code: 'f230fh0g3', name: 'Blue T-Shirt', category: 'Fitness', quantity: '61' },
    { code: 'f230fh0g3', name: 'Bracelet', category: 'Clothing', quantity: '33' },
    { code: 'f230fh0g3', name: 'Brown Purse', category: 'Accessories', quantity: '2' },
    { code: 'f230fh0g3', name: 'Chakra Bracelet', category: 'Fitness', quantity: '13' },
  ];

  constructor(
    private clientListService: ClientListService
  ) {
    this.clientListService.loadClients();
  }
}
