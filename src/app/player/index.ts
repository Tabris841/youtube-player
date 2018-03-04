import { NgModule } from '@angular/core';
import { CoreModule } from '../core';

import { PlayerComponent } from './player.component';

@NgModule({
  imports: [CoreModule],
  declarations: [PlayerComponent],
  exports: [PlayerComponent],
  providers: []
})
export class PlayerModule {}
