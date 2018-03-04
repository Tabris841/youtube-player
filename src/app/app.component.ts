import { Component } from '@angular/core';
import { YoutubeSearch, YoutubePlayerService, NowPlaylistService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public youtubeSearch: YoutubeSearch,
    public playerService: YoutubePlayerService,
    public nowPlaylistService: NowPlaylistService
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
    this.playerService.playVideo(this.nowPlaylistService.getCurrent());
  }

  sortVideo(media: GoogleApiYouTubeSearchResource) {}

  isLastIndex() {}
}
