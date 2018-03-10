import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { EchoesState } from '@core/store';
import { AppPlayerApi } from '@core/api/app-player.api';
import * as NowPlaylist from '@core/store/now-playlist';
import * as PlayerSearch from '@store/player-search';

@Component({
  selector: 'app-youtube-videos',
  styleUrls: ['./youtube-videos.scss'],
  template: `
    <app-loader [message]="'Loading Awesome Media Results'" [loading]="loading$ | async"></app-loader>
    <app-youtube-list
      [list]="videos$ | async"
      [queued]="playlistVideos$ | async"
      (play)="playSelectedVideo($event)"
      (queue)="queueSelectedVideo($event)"
      (unqueue)="removeVideoFromPlaylist($event)"
    ></app-youtube-list>
  `
})
export class YoutubeVideosComponent implements OnInit {
  videos$ = this.store.select(PlayerSearch.getPlayerSearchResults);
  playlistVideos$ = this.store.select(NowPlaylist.getPlaylistVideos);
  loading$ = this.store.select(PlayerSearch.getIsSearching);

  constructor(
    private store: Store<EchoesState>,
    private appPlayerApi: AppPlayerApi
  ) {}

  ngOnInit() {
    this.store.dispatch(
      new PlayerSearch.UpdateSearchType(PlayerSearch.CSearchTypes.VIDEO)
    );
    this.store.dispatch(new PlayerSearch.SearchCurrentQuery());
  }

  playSelectedVideo(media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.playVideo(media);
  }

  queueSelectedVideo(media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.queueVideo(media);
  }

  removeVideoFromPlaylist(media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.removeVideoFromPlaylist(media);
  }
}
