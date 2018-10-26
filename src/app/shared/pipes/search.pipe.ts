import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], terms: string): any[] {
    return !terms ?
      items :
      items.filter(item => item.name.toLowerCase().includes(terms.toLowerCase()));
  }

}
