import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientItemService } from '../../../shared/services/client-item.service';
import { ClientFull } from '../../../shared/types/client-full.type';

@Component({
  selector: 'app-client-item',
  templateUrl: './client-item.component.html',
  styleUrls: ['./client-item.component.scss']
})
export class ClientItemComponent implements OnInit {
  client: ClientFull;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientItemService: ClientItemService
  ) {
    const id = this.activatedRoute.snapshot.params['id'];
    this.clientItemService.loadClient(+id);
  }

  ngOnInit(): void {
  }

}
