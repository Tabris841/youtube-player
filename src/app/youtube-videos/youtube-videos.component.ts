import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { EchoesState } from '../core/store';
import { EchoesVideos } from '../core/store/youtube-videos';
import * as YoutubeVideos from '../core/store/youtube-videos/youtube-videos.actions';

import { YoutubeSearch } from '../core/services/youtube-search.service';
import { NowPlaylistService } from '../core/services/now-playlist.service';

import { YoutubeMediaItemsMock } from '../../../tests/mocks/youtube.media.items';

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
    private store: Store<EchoesState>
  ) {}

  ngOnInit() {
    this.videos$ = this.store.select(state => state.videos);
  }

  search(query: string) {
    this.youtubeSearch.search(query, false).then(response => {
      this.store.dispatch(new YoutubeVideos.AddVideos(response.items));
    });
  }

  playSelectedVideo(media: GoogleApiYouTubeSearchResource) {}

  queueSelectedVideo(media: GoogleApiYouTubeSearchResource) {}

  resetPageToken() {}

  searchMore() {}
}
