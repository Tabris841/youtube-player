import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mapTo } from 'rxjs/operators';

import { PlayerService } from '../services/player.service';
import {
  NowPlaylistTypes,
  SelectVideo,
  QueueVideo
} from '../store/now-playlist';

@Injectable()
export class NowPlaylistEffects {
  constructor(
    private actions$: Actions,
    private playerService: PlayerService
  ) {}

  @Effect()
  queueVideo$ = this.actions$.pipe(
    ofType(NowPlaylistTypes.SELECT),
    map((action: SelectVideo) => action.payload),
    map(media => new QueueVideo(media))
  );

  @Effect({ dispatch: false })
  playVideo$ = this.actions$.pipe(
    ofType(NowPlaylistTypes.SELECT),
    map((action: SelectVideo) => action.payload),
    mapTo(media => this.playerService.playVideo(media))
  );
}
