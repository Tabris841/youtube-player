import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserPlayerService } from '../user-player.service';
import { EchoesState } from '@core/store';

@Component({
  selector: 'app-playlists',
  template: `
  <section class="videos-list">
    <div class="list-unstyled ux-maker youtube-items-container clearfix">
      <app-youtube-playlist
        *ngFor="let playlist of playlists$ | async"
        [media]="playlist"
        link="/user/"
        (play)="playSelectedPlaylist(playlist)"
        (queue)="queueSelectedPlaylist(playlist)">
      </app-youtube-playlist>
    </div>
  </section>
  `
})
export class PlaylistsComponent implements OnInit {
  playlists$ = this.store.select(state => state.user.playlists);

  constructor(
    private store: Store<EchoesState>,
    private userPlayerService: UserPlayerService
  ) {}

  ngOnInit() {}

  playSelectedPlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.userPlayerService.playSelectedPlaylist(playlist);
  }

  queueSelectedPlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.userPlayerService.queuePlaylist(playlist);
  }
}
