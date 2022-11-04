import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ClientItemService } from '../../../shared/services/client-item.service';
import { ClientFull } from '../../../shared/types/client-full.type';
import { PaymentListType } from '../../../shared/types/payment-list.type';

@Component({
  selector: 'app-client-item',
  templateUrl: './client-item.component.html',
  styleUrls: ['./client-item.component.scss']
})
export class ClientItemComponent implements OnInit, OnDestroy {
  currentClient: ClientFull;
  phoneControl = new FormControl<string>({ value: '', disabled: true });
  subscription: Subscription;
  editNumber: boolean;
  PaymentType: PaymentListType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientItemService: ClientItemService,
    private confirmationService: ConfirmationService
  ) {
    const id = this.activatedRoute.snapshot.params['id'];
    this.clientItemService.loadClient(+id);
    this.subscription = this.clientItemService.currentClient$.subscribe({
      next: value => {
        this.currentClient = value;
        this.phoneControl.setValue(value.phoneNumber);
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  cancelOrEdit() {
    if (!this.editNumber) {
      this.editNumber = true;
      this.phoneControl.enable();
      return;
    }
    this.editNumber = false;
    this.phoneControl.setValue(this.currentClient.phoneNumber);
    this.phoneControl.disable();
  }

  openConfirmationPhoneChange() {
    this.confirmationService.confirm({
      message: 'Вы уверены что хоите сменить номер телефона?',
      accept: () => this.confirmPhoneChange(),
      acceptLabel: 'Да',
      rejectLabel: 'Нет'
    });
  }

  private confirmPhoneChange() {
    this.clientItemService.changePhone(this.currentClient.id, this.phoneControl.value).subscribe({
      next: () => {
        this.currentClient.phoneNumber = this.phoneControl.value;
        this.cancelOrEdit();
      }
    })
  }
}
