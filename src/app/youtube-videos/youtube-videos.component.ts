import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { EchoesState } from '../core/store';
import { GoogleApiYoutubeVideo } from '../core/store/youtube-videos';
import * as YoutubeVideos from '../core/store/youtube-videos/youtube-videos.actions';
import * as NowPlaylist from '../core/store/now-playlist/now-playlist.actions';

@Component({
  selector: 'app-youtube-videos',
  templateUrl: './youtube-videos.component.html',
  styleUrls: ['./youtube-videos.component.scss']
})
export class YoutubeVideosComponent implements OnInit {
  videos$: Observable<GoogleApiYoutubeVideo[]>;
  searchQuery = '';

  constructor(private store: Store<EchoesState>) {}

  ngOnInit() {
    this.videos$ = this.store.select(state => state.videos.results);
  }

  search(query: string) {
    this.store.dispatch(new YoutubeVideos.SearchNewQuery(query));
  }

  playSelectedVideo(media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(new NowPlaylist.SelectVideo(media));
  }

  queueSelectedVideo(media) {
    this.store.dispatch(new NowPlaylist.QueueVideo(media));
  }

  resetPageToken() {}

  searchMore(query: string) {
    this.store.dispatch(new YoutubeVideos.SearchMore());
  }
}
