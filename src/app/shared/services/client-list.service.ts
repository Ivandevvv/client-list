import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ApiRequestUrl } from '../types/api-request.enum';
import { ClientList } from '../types/client-list.type';

@Injectable({
  providedIn: 'root'
})
export class ClientListService {
  private clientsList = new BehaviorSubject<ClientList[]>(null);

  constructor(
    private httpClient: HttpClient
  ) { }

  loadClients() {
    if (this.clientsList.getValue()) { return; }

    this.httpClient.get<{ result: ClientList[] }>(ApiRequestUrl.get_clients).pipe(
      map(({ result }) => result)
    ).subscribe({
      next: data => {
        this.clientsList.next(data);
      }
    });
  }
}
