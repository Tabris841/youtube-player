import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { EchoesState } from '@store/reducers';
import { NowPlaylistService } from '@core/services/now-playlist.service';
import { INowPlaylist } from '@store/now-playlist';
import * as AppPlayer from '@store/app-player/app-player.actions';
import { NowPlaylistComponent } from './now-playlist';

@Component({
  selector: 'app-now-playing',
  styleUrls: ['./now-playing.component.scss'],
  templateUrl: './now-playing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlayingComponent implements OnInit {
  public nowPlaylist$: Observable<INowPlaylist>;
  @ViewChild(NowPlaylistComponent) nowPlaylistComponent: NowPlaylistComponent;

  constructor(
    public store: Store<EchoesState>,
    public nowPlaylistService: NowPlaylistService
  ) {}

  ngOnInit() {
    this.nowPlaylist$ = this.nowPlaylistService.playlist$;
  }

  selectVideo(media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(new AppPlayer.PlayVideo(media));
    this.nowPlaylistService.updateIndexByMedia(media.id);
  }

  sortVideo() {}

  updateFilter(searchFilter: string) {
    this.nowPlaylistService.updateFilter(searchFilter);
  }

  resetFilter() {
    this.nowPlaylistService.updateFilter('');
  }

  clearPlaylist() {
    this.nowPlaylistService.clearPlaylist();
  }

  removeVideo(media) {
    this.nowPlaylistService.removeVideo(media);
  }

  onHeaderClick() {
    this.nowPlaylistComponent.scrollToActiveTrack();
  }

  selectTrackInVideo(trackEvent: {
    time: string;
    media: GoogleApiYouTubeVideoResource;
  }) {
    this.store.dispatch(new AppPlayer.PlayVideo(trackEvent.media));
    this.nowPlaylistService.seekToTrack(trackEvent);
  }
}
