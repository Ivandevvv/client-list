import { Component, } from '@angular/core';
import { ClientListService } from '../../../shared/services/client-list.service';
import { ClientList } from '../../../shared/types/client-list.type';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent {
  ClientItemType: ClientList;

  constructor(
    public clientListService: ClientListService
  ) {
    this.clientListService.loadClients();
  }
}
