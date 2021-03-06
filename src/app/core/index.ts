import { NgModule } from '@angular/core';

import { CoreStoreModule } from './store';
import { AppEffectsModules } from './effects';

import { APP_SERVICES } from './services';
import { APP_RESOLVERS } from './resolvers';
import { APP_APIS } from './api';

@NgModule({
  imports: [CoreStoreModule, AppEffectsModules],
  declarations: [],
  exports: [CoreStoreModule],
  providers: [...APP_SERVICES, ...APP_RESOLVERS, ...APP_APIS]
})
export class CoreModule {}
