import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typed',
  standalone: true
})
export class TypedPipe implements PipeTransform {

  transform<T>(value: any, typedObject: T): T {
    // ng-template не пробрасывает типы при "let-variable", этот пайп позволяет типизировать
    // переменную "variable". Полезно в таблицах primaNG
    return value as T;
  }

}
