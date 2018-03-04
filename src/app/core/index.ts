import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CORE_COMPONENTS } from './components';
import { SearchPipe } from './pipes/search.pipe';

import { CoreStoreModule } from './store';

@NgModule({
  imports: [InfiniteScrollModule, CommonModule, CoreStoreModule],
  declarations: [...CORE_COMPONENTS, SearchPipe],
  exports: [InfiniteScrollModule, ...CORE_COMPONENTS, CommonModule, CoreStoreModule, SearchPipe],
  providers: []
})
export class CoreModule {}
