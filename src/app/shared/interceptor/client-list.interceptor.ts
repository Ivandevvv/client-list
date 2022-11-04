import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRequestUrl } from '../types/api-request.enum';
import { ClientList } from '../types/client-list.type';

@Injectable()
export class ClientListInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<ClientList>, next: HttpHandler): Observable<HttpEvent<ClientList>> {
    let clientReq: HttpRequest<ClientList>;
    if (request.url === ApiRequestUrl.get_clients) {
      clientReq = request.clone({
        url: '/assets/base/clients.json'
      })
    }
    return next.handle(clientReq);
  }
}
