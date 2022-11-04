import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typed',
  standalone: true
})
export class TypedPipe implements PipeTransform {

  transform<T>(value: any, typedObject: T): T {
    return value as T;
  }

}
