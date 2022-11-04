import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiRequestUrl } from '../types/api-request.enum';
import { ClientFullResponse } from '../types/client-full-response.type';
import { ClientListResponse } from '../types/client-list-response.type';
import { ClientList } from '../types/client-list.type';

@Injectable()
export class ClientListInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<ClientFullResponse>, next: HttpHandler): Observable<HttpEvent<ClientListResponse>> {
    let clientReq: HttpRequest<any>;
    if (request.url === ApiRequestUrl.get_clients) {
      clientReq = request.clone({
        url: '/assets/base/clients.json'
      });

      return next.handle(clientReq).pipe(
        map(data => {
          if (data instanceof HttpResponse<any>) {
            return this.transformClientsList(data as HttpEvent<ClientListResponse>);
          }
          return data
        })
      );
    }

    return next.handle(request);
  }

  private transformClientsList(data: HttpEvent<ClientListResponse>): HttpEvent<ClientListResponse> {
    const newData = data as HttpResponse<ClientListResponse>;
    const clientList = newData.body.result;
    newData.body.result = clientList.map(p => ({
      id: p.id,
      name: p.name,
      inn: p.inn,
      openingDate: p.openingDate,
      balance: p.balance,
    } as ClientList))
    return newData;
  }
}
