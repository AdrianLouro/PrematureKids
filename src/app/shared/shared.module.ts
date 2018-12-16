import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './pipes/search.pipe';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SearchPipe, SortPipe],
  exports: [SearchPipe, SortPipe]
})
export class SharedModule { }
