import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CORE_COMPONENTS } from './components';
import { PIPES } from './pipes';

import { CoreStoreModule } from './store';

@NgModule({
  imports: [InfiniteScrollModule, CommonModule, FormsModule, CoreStoreModule],
  declarations: [...CORE_COMPONENTS, ...PIPES],
  exports: [
    InfiniteScrollModule,
    ...CORE_COMPONENTS,
    CommonModule,
    FormsModule,
    CoreStoreModule,
    ...PIPES
  ],
  providers: []
})
export class CoreModule {}
