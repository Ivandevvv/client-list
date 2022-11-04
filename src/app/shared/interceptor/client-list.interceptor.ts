import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpClient
} from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { ApiRequestUrl } from '../types/api-request.enum';
import { ClientFullResponse } from '../types/client-full-response.type';

@Injectable()
export class ClientListInterceptor implements HttpInterceptor {

  constructor(private httpClient: HttpClient) {}

  intercept(request: HttpRequest<ClientFullResponse>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url === ApiRequestUrl.get_clients) {
      return this.httpClient.get<ClientFullResponse>('/assets/base/clients.json').pipe(
        switchMap(data => of(new HttpResponse({
          status: 200, body: { result: data.result.map(p => ({
              id: p.id,
              name: p.name,
              inn: p.inn,
              openingDate: p.openingDate,
              balance: p.balance,
            }))
          }
        })))
      );
    }

    return next.handle(request);
  }
}
