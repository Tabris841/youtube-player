import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  map,
  mapTo,
  filter,
  withLatestFrom,
  tap,
  switchMap
} from 'rxjs/operators';

import { EchoesState } from '@store/reducers';
import {
  NowPlaylistTypes,
  SelectVideo,
  QueueVideo,
  PlayerStateChange,
  MediaEnded,
  SeekTo,
  LoadPlaylistAction,
  LoadPlaylistEndAction,
  PlaylistAction
} from '@store/now-playlist';
import * as NowPlaylist from '@store/now-playlist';
import { MediaParserService, YoutubePlayerService } from '@core/services';
import { UserProfile } from '@core/services/user-profile.service';

@Injectable()
export class NowPlaylistEffects {
  constructor(
    private actions$: Actions,
    public store: Store<EchoesState>,
    private mediaParser: MediaParserService,
    private playerService: YoutubePlayerService,
    private userProfile: UserProfile
  ) {}

  @Effect()
  queueVideo$ = this.actions$.pipe(
    ofType<SelectVideo>(NowPlaylistTypes.SELECT),
    map((action: SelectVideo) => action.payload),
    map(media => new QueueVideo(media))
  );

  @Effect()
  playerStateChange$ = this.actions$.pipe(
    ofType<PlayerStateChange>(NowPlaylistTypes.PLAYER_STATE_CHANGE),
    map(action => action.payload),
    filter(
      (event: YT.OnStateChangeEvent) => event.data === YT.PlayerState.ENDED
    ),
    map(() => new MediaEnded())
  );

  /* if it's the last track
   * AND repeat is on
   * THEN play the first track
  **/
  @Effect()
  loadNextTrack$ = this.actions$.pipe(
    ofType(NowPlaylistTypes.MEDIA_ENDED),
    withLatestFrom(this.store.select(NowPlaylist.getSelectedMedia)),
    filter(
      (states: [any, GoogleApiYouTubeVideoResource]) =>
        states[1] && states[1].hasOwnProperty('id')
    ),
    map(
      (states: [any, GoogleApiYouTubeVideoResource]) =>
        new NowPlaylist.SelectVideo(states[1])
    )
  );

  @Effect()
  selectBeforeSeekToTime$ = this.actions$.pipe(
    ofType<SeekTo>(NowPlaylistTypes.SELECT_AND_SEEK_TO_TIME),
    map(action => action.payload),
    map(trackEvent => new NowPlaylist.UpdateIndexByMedia(trackEvent.media.id))
  );

  @Effect({ dispatch: false })
  seekToTime$ = this.actions$.pipe(
    ofType<SeekTo>(NowPlaylistTypes.SELECT_AND_SEEK_TO_TIME),
    map(action => action.payload),
    tap(trackEvent =>
      this.playerService.seekTo(this.mediaParser.toNumber(trackEvent.time))
    )
  );

  @Effect()
  loadPlaylist$ = this.actions$.pipe(
    ofType<LoadPlaylistAction>(NowPlaylistTypes.LOAD_PLAYLIST_START),
    map(action => action.payload),
    switchMap((id: string) => this.userProfile.fetchAllPlaylistItems(id)),
    map(
      (playlistItems: GoogleApiYouTubeVideoResource[]) =>
        new NowPlaylist.LoadPlaylistEndAction(playlistItems)
    )
  );

  @Effect()
  addPlaylistItems$ = this.actions$.pipe(
    ofType<LoadPlaylistEndAction>(NowPlaylistTypes.LOAD_PLAYLIST_END),
    map(action => action.payload),
    map(
      (playlistItems: GoogleApiYouTubeVideoResource[]) =>
        new NowPlaylist.QueueVideos(playlistItems)
    )
  );

  @Effect()
  playPlaylistFirstTrack$ = this.actions$.pipe(
    ofType<LoadPlaylistEndAction>(NowPlaylistTypes.LOAD_PLAYLIST_END),
    map(action => action.payload),
    map(
      (playlistItems: GoogleApiYouTubeVideoResource[]) =>
        new NowPlaylist.SelectVideo(playlistItems[0])
    )
  );

  @Effect()
  playPlaylist$ = this.actions$.pipe(
    ofType<PlaylistAction>(NowPlaylistTypes.PLAY_PLAYLIST),
    map(action => action.payload),
    map((id: string) => new NowPlaylist.LoadPlaylistAction(id))
  );
}
