import { NgModule } from '@angular/core';
import { CoreModule } from '../core';

import { NowPlayingComponent } from './now-playing.component';
import { NowPlaylistComponent } from './now-playlist';
import { NowPlaylistFilterComponent } from './now-playlist-filter';

@NgModule({
  imports: [CoreModule],
  declarations: [
    NowPlayingComponent,
    NowPlaylistComponent,
    NowPlaylistFilterComponent
  ],
  exports: [NowPlayingComponent]
})
export class NowPlayingModule {}
