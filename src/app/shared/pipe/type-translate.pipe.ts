import { Pipe, PipeTransform } from '@angular/core';
import { PaymentType } from '../types/payment-type.enum';

@Pipe({
  name: 'typeTranslate',
  standalone: true
})
export class TypeTranslatePipe implements PipeTransform {

  transform(value: PaymentType): unknown {
    if (value === PaymentType.incoming) {
      return 'Входящее';
    } else {
      return 'Исходящее';
    }
  }

}
