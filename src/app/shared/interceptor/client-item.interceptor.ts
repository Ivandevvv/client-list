import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor, HttpResponse, HttpClient, HttpEvent
} from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { ApiRequestUrl } from '../types/api-request.enum';
import { ClientFullResponse } from '../types/client-full-response.type';

@Injectable()
export class ClientItemInterceptor implements HttpInterceptor {

  constructor(private httpClient: HttpClient) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const initUrl = request.url;
    const clientId = initUrl.replace( /^\D+/g, '');

    if (request.url.startsWith(ApiRequestUrl.get_single_client) && request.url !== ApiRequestUrl.get_clients) {
      return this.httpClient.get<ClientFullResponse>('/assets/base/clients.json').pipe(
        switchMap(data => of(new HttpResponse({
          status: 200,
          body: { result: data.result.filter(p => p.id === +clientId) }
        })))
      );
    }
    if (request.url.endsWith(ApiRequestUrl.change_phone)) {
      return of(new HttpResponse({
        status: 200, body: null
      }));
    }

    return next.handle(request);
  }
}
