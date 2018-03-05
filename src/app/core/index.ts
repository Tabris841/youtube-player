import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CORE_COMPONENTS } from './components';
import { PIPES } from './pipes';

import { CoreStoreModule } from './store';
import { AppEffectsModules } from './effects';

@NgModule({
  imports: [
    InfiniteScrollModule,
    CommonModule,
    FormsModule,
    CoreStoreModule,
    AppEffectsModules
  ],
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
