import { NowPlaylistService } from '@core/services';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import {
  map,
  switchMap,
  tap,
  catchError,
  withLatestFrom
} from 'rxjs/operators';

import { EchoesState } from '@store/reducers';
import * as AppPlayer from '@store/app-player';
import { YoutubePlayerService } from '@core/services/youtube-player.service';
import { YoutubeVideosInfo } from '@core/services/youtube-videos-info.service';

import {
  AppPlayerActionTypes,
  PlayVideo,
  LoadAndPlay,
  SetupPlayer,
  PlayerStateChange
} from '@store/app-player';

@Injectable()
export class AppPlayerEffects {
  constructor(
    public actions$: Actions,
    public store: Store<EchoesState>,
    public youtubePlayerService: YoutubePlayerService,
    public youtubeVideosInfo: YoutubeVideosInfo
  ) {}

  @Effect() init$ = defer(() => of(new AppPlayer.ResetFullScreen()));

  @Effect()
  playVideo$ = this.actions$.pipe(
    ofType<PlayVideo>(AppPlayerActionTypes.PLAY),
    map(action => action.payload),
    switchMap(media =>
      of(this.youtubePlayerService.playVideo(media)).map(
        (video: any) => new AppPlayer.PlayStarted(video)
      )
    )
  );

  @Effect({ dispatch: false })
  pauseVideo$ = this.actions$.pipe(
    ofType(AppPlayerActionTypes.PAUSE),
    tap(() => this.youtubePlayerService.pause())
  );

  @Effect()
  loadAndPlay$ = this.actions$.pipe(
    ofType<LoadAndPlay>(AppPlayerActionTypes.LOAD_AND_PLAY),
    map(action => action.payload),
    switchMap((media: any) =>
      this.youtubeVideosInfo
        .fetchVideoData(media.id || media.id.videoId)
        .map((video: any) => new AppPlayer.PlayVideo(video))
    ),
    catchError(() => of({ type: 'LOAD_AND_PLAY_ERROR' }))
  );

  @Effect({ dispatch: false })
  toggleFullscreen$ = this.actions$.pipe(
    ofType<LoadAndPlay>(AppPlayerActionTypes.LOAD_AND_PLAY),
    withLatestFrom(this.store.select(AppPlayer.getPlayerFullscreen)),
    tap((states: [any, { on; height; width }]) =>
      this.youtubePlayerService.setSize(states[1].height, states[1].width)
    )
  );

  @Effect({ dispatch: false })
  setupPlayer$ = this.actions$.pipe(
    ofType<SetupPlayer>(AppPlayerActionTypes.SETUP_PLAYER),
    map(action => action.payload),
    tap(player => this.youtubePlayerService.setupPlayer(player))
  );

  @Effect()
  playerStateChange$ = this.actions$.pipe(
    ofType<PlayerStateChange>(AppPlayerActionTypes.PLAYER_STATE_CHANGE),
    map(action => action.payload),
    map((event: YT.OnStateChangeEvent) => new AppPlayer.UpdateState(event.data))
  );
}
