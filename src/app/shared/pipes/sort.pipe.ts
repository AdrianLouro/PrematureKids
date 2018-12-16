import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(items: any[], field: string): any[] {
    return !items ?
      items :
      items.sort((o1, o2) =>
        o1[field] > o2[field] ? 1 : o1[field] < o2[field] ? -1 : 0
      );
  }

}
