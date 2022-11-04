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

@Injectable()
export class ClientItemInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<ClientFullResponse>, next: HttpHandler): Observable<HttpEvent<ClientFullResponse>> {
    let clientReq: HttpRequest<any>;
    if (request.url.startsWith(ApiRequestUrl.get_single_client) && request.url !== ApiRequestUrl.get_clients) {

      clientReq = request.clone({ url: '/assets/base/clients.json' });
      const clientId = clientReq.url.replace(ApiRequestUrl.get_single_client, '');

      return next.handle(clientReq).pipe(
        map(data => {
          if (data instanceof HttpResponse<any>) {
            return this.transformClientItem(data, +clientId);
          }
          return data;
        })
      );
    }

    return next.handle(request);
  }

  private transformClientItem(
    data: HttpResponse<ClientFullResponse>,
    clientId: number
  ): HttpResponse<ClientFullResponse> {
    const newData = data as HttpResponse<ClientFullResponse>;
    const clientList = newData.body.result;
    newData.body.result = clientList.filter(p => p.id === clientId);
    return newData;
  }
}
