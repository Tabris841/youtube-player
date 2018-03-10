import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { EchoesState } from '@core/store';
import * as PlayerSearch from '@core/store/player-search';
import { AppPlayerApi } from '@core/api/app-player.api';

import { fadeInAnimation } from '@shared/animations/fade-in.animation';

@Component({
  selector: 'app-youtube-playlists',
  styles: [
    `
    :host .youtube-items-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
  `
  ],
  animations: [fadeInAnimation],
  template: `
  <app-loader [message]="'Loading Awesome Playlists Results'" [loading]="isSearching$ | async"></app-loader>
  <section class="videos-list">
    <div class="list-unstyled ux-maker youtube-items-container clearfix">
      <app-youtube-playlist
        [@fadeIn]
        *ngFor="let playlist of results$ | async"
        link=""
        [media]="playlist"
        (play)="playPlaylist(playlist)"
        (queue)="queueSelectedPlaylist(playlist)">
      </app-youtube-playlist>
    </div>
  </section>
  `
})
export class YoutubePlaylistsComponent implements OnInit {
  results$ = this.store.select(PlayerSearch.getPlayerSearchResults);
  isSearching$ = this.store.select(PlayerSearch.getIsSearching);

  constructor(
    private store: Store<EchoesState>,
    private appPlayerApi: AppPlayerApi
  ) {}

  ngOnInit() {
    this.store.dispatch(
      new PlayerSearch.UpdateSearchType(PlayerSearch.CSearchTypes.PLAYLIST)
    );
    this.store.dispatch(new PlayerSearch.PlaylistsSearchStart());
  }

  playPlaylist(media: GoogleApiYouTubePlaylistResource) {
    // this.store.dispatch(new PlayPlaylistAction(media.id));
    this.appPlayerApi.playPlaylist(media);
  }

  queueSelectedPlaylist(media: GoogleApiYouTubePlaylistResource) {
    // this.store.dispatch(new LoadPlaylistAction(media.id));
    this.appPlayerApi.queuePlaylist(media);
  }
}
