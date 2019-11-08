import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(obj): any {
    const keys = [];
    for (const [key, value] of Object.entries(obj)) {
      keys.push(key);
    }
    return keys;
  }
}
