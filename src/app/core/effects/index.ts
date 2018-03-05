import { EffectsModule } from '@ngrx/effects';

import { YoutubeVideosEffects } from './youtube-videos.effects';
import { NowPlaylistEffects } from './now-playlist.effects';

export const AppEffectsModules = EffectsModule.forRoot([
  YoutubeVideosEffects,
  NowPlaylistEffects
]);
