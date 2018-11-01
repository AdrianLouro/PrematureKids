import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], terms: string, field: string[]): any[] {
    return !terms ?
      items :
      items.filter(item => {
        switch (field.length) {
          case 1: return item[field[0]].toLowerCase().includes(terms.toLowerCase());
          case 2: return item[field[0]][field[1]].toLowerCase().includes(terms.toLowerCase());
          default: return [];
        }
      });
  }

}
