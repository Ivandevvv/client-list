import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map } from 'rxjs';
import { ApiRequestUrl } from '../types/api-request.enum';
import { ClientFullResponse } from '../types/client-full-response.type';
import { ClientFull } from '../types/client-full.type';

@Injectable({
  providedIn: 'root'
})
export class ClientItemService {
  private currentClient = new BehaviorSubject<ClientFull>(null);
  currentClient$ = this.currentClient.pipe(filter(v => !!v));

  constructor(
    private httpClient: HttpClient
  ) { }

  loadClient(id: number) {
    if (this.currentClient.getValue()?.id === id) { return; }
    this.httpClient.get<ClientFullResponse>(ApiRequestUrl.get_single_client + id).pipe(
      map(({ result }) => result)
    ).subscribe({
      next: data => {
        this.currentClient.next(data[0]);
      }
    });
  }

  changePhone(id: number, phoneNumber: string) {
    return this.httpClient.post(`/${id}/${ApiRequestUrl.change_phone}`, { phoneNumber });
  }
}
