import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { BalancePipe } from '../shared/pipe/balance.pipe';
import { TypeTranslatePipe } from '../shared/pipe/type-translate.pipe';
import { TypedPipe } from '../shared/pipe/typed.pipe';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientItemComponent } from './components/client-item/client-item.component';



@NgModule({
  declarations: [
    ClientListComponent,
    ClientItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ClientListComponent },
      { path: ':id', component: ClientItemComponent }
    ]),
    TableModule,
    TypedPipe,
    RouterLink,
    BalancePipe,
    NgxMaskModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    TypeTranslatePipe
  ],
  providers: [
    ConfirmationService
  ],
})
export class ClientListModule { }
