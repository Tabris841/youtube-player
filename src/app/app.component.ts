import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  YoutubeSearch,
  YoutubePlayerService,
  NowPlaylistService
} from './core/services';
import { EchoesState } from './core/store';
import { PlayerService } from './core/services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public youtubeSearch: YoutubeSearch,
    public playerService: PlayerService,
    public nowPlaylistService: NowPlaylistService,
    public store: Store<EchoesState>
  ) {}

  selectVideo(media: GoogleApiYouTubeVideoResource) {
    this.nowPlaylistService.updateIndexByMedia(media.id);
  }

  handleVideoEnded(state) {
    if (!this.isLastIndex()) {
      this.playNextVideo(state);
    }
  }

  playNextVideo(player) {
    this.nowPlaylistService.selectNextIndex();
    // this.playerService.playVideo(this.nowPlaylistService.getCurrent());
  }

  sortVideo(media: GoogleApiYouTubeSearchResource) {}

  isLastIndex() {}
}
