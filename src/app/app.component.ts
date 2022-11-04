import { Component } from '@angular/core';
import { ClientListService } from './shared/services/client-list.service';
import { ClientList } from './shared/types/client-list.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  clientItem: ClientList;

  constructor(
    public clientListService: ClientListService
  ) {
    this.clientListService.loadClients();
  }
}
