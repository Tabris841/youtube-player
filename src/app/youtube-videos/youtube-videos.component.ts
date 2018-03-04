import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Store } from '@ngrx/store';

import { EchoesState } from '../core/store';
import { EchoesVideos } from '../core/store/youtube-videos';
import * as YoutubeVideos from '../core/store/youtube-videos/youtube-videos.actions';
import * as NowPlaylist from '../core/store/now-playlist/now-playlist.actions';
import { YoutubeSearch } from '../core/services/youtube-search.service';
import { NowPlaylistService } from '../core/services/now-playlist.service';
import { NowPlaylistActions } from '../core/store/now-playlist';
import { YoutubeVideosInfo } from '../core/services';
import { PlayerService } from '../core/services/player.service';

@Component({
  selector: 'app-youtube-videos',
  templateUrl: './youtube-videos.component.html',
  styleUrls: ['./youtube-videos.component.scss']
})
export class YoutubeVideosComponent implements OnInit {
  videos$: Observable<EchoesVideos>;
  searchQuery = '';

  constructor(
    private youtubeSearch: YoutubeSearch,
    private nowPlaylistService: NowPlaylistService,
    private youtubeVideosInfo: YoutubeVideosInfo,
    private playerService: PlayerService,
    private store: Store<EchoesState>
  ) {}

  ngOnInit() {
    this.videos$ = this.store.select(state => state.videos);
  }

  search(query: string) {
    if (this.youtubeSearch.isNewSearchQuery(query)) {
      this.store.dispatch(new YoutubeVideos.Reset());
    }
    this.youtubeSearch
      .search(query)
      .map((mediaItems: GoogleApiYouTubeSearchResource[]) =>
        mediaItems.map(video => video.id.videoId)
      )
      .switchMap((mediaIds: string[]) =>
        this.youtubeVideosInfo.fetchVideoData(mediaIds.join(','))
      )
      .subscribe(mediaItems => {
        this.store.dispatch(new YoutubeVideos.AddVideos(mediaItems));
      });
  }

  playSelectedVideo(media: GoogleApiYouTubeVideoResource) {
    this.playerService.playVideo(media);
    this.queueSelectedVideo(media);
  }

  queueSelectedVideo(media) {
    this.store.dispatch(new NowPlaylist.QueueVideo(media));
  }

  resetPageToken() {}

  searchMore(query: string) {
    this.youtubeSearch.searchMore();
    this.search(query);
  }
}
