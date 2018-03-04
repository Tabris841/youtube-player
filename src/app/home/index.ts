import { NgModule } from '@angular/core';

import { CoreModule } from '../core';
import { HomeComponent } from './home.component';
import { routing } from './home.routing';

@NgModule({
  imports: [CoreModule, routing],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: []
})
export class HomeModule {}
