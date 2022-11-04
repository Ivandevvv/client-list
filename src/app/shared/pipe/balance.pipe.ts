import { Pipe, PipeTransform } from '@angular/core';
import { Balance, BalanceCurrency } from '../types/balance.type';

@Pipe({
  name: 'balance',
  standalone: true
})
export class BalancePipe implements PipeTransform {
  private currencySymbol = {
    [BalanceCurrency.RUB]: '₽',
    [BalanceCurrency.USD]: '$'
  }

  transform(value: Balance, minCharts?: number, toFixed?: number): string {
    const regEx = /\B(?=(\d{3})+(?!\d))/g;
    let fullBalance = value.sum;
    const balanceArr = toFixed
      ? fullBalance.toFixed(toFixed).split('.')
      : fullBalance.toString().split('.');

    const currency = value.currency;
    if (minCharts) {
      balanceArr[0] = this.addsChartsIfNeed(balanceArr[0], minCharts);
    }
    let balance = balanceArr[0].replace(regEx, ' ')
    let tenth = balanceArr[1];

    if (tenth) {
      balance = balance + '.' + tenth;
    }


    return `${balance}  ${this.currencySymbol[currency]}`;
  }

  private addsChartsIfNeed(balanceStr: string, minCharts: number) {
    const currentCharts = balanceStr.length;
    if (minCharts - currentCharts  > 0) {
      const addedStr = Array(minCharts - currentCharts).fill(0).join('');
      return addedStr + balanceStr;
    }

    return balanceStr;
  }
}
