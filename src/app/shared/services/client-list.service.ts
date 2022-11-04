import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ApiRequestUrl } from '../types/api-request.enum';
import { ClientListResponse } from '../types/client-list-response.type';
import { ClientList } from '../types/client-list.type';

@Injectable({
  providedIn: 'root'
})
export class ClientListService {
  private clientsList = new BehaviorSubject<ClientList[]>(null);
  clientsList$ = this.clientsList.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  loadClients() {
    if (this.clientsList.getValue()) { return; }

    this.httpClient.get<ClientListResponse>(ApiRequestUrl.get_clients).pipe(
      map(({ result }) => result)
    ).subscribe({
      next: data => {
        this.clientsList.next(data);
      }
    });
  }
}
