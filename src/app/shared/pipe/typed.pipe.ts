import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typed',
  standalone: true
})
export class TypedPipe implements PipeTransform {

  transform<T>(value: any, typedObject: T): T {
    // primeNG не пробрасывает типы при формировании таблицы, этот пайп позволяет типизировать
    // ту переменную которую мы используем в таблице primeNG
    return value as T;
  }

}
