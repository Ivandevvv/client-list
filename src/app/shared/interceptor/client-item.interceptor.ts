import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { map, of } from 'rxjs';
import { ApiRequestUrl } from '../types/api-request.enum';
import { ClientFullResponse } from '../types/client-full-response.type';

@Injectable()
export class ClientItemInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const initUrl = request.url;
    const clientId = initUrl.replace( /^\D+/g, '');
    let clientReq: HttpRequest<any> = request.clone({ url: '/assets/base/clients.json' });

    if (request.url.startsWith(ApiRequestUrl.get_single_client) && request.url !== ApiRequestUrl.get_clients) {
      return next.handle(clientReq).pipe(
        map(data => {
          if (data instanceof HttpResponse<any>) {
            return this.transformClientItem(data, +clientId);
          }
          return data;
        })
      );
    }
    if (request.url.endsWith(ApiRequestUrl.change_phone)) {
      return of(new HttpResponse({
        status: 200, body: null
      }));
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
