import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { BalancePipe } from '../shared/pipe/balance.pipe';
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
    BalancePipe
  ]
})
export class ClientListModule { }
