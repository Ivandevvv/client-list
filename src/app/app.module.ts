import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { TableModule } from 'primeng/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientItemInterceptor } from './shared/interceptor/client-item.interceptor';
import { ClientListInterceptor } from './shared/interceptor/client-list.interceptor';
import { BalancePipe } from './shared/pipe/balance.pipe';
import { TypedPipe } from './shared/pipe/typed.pipe';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TableModule,
    HttpClientModule,
    TypedPipe,
    BalancePipe,
    NgxMaskModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ClientListInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ClientItemInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
})
export class AppModule { }
