import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';

import * as PlayerSearch from '@store/player-search';
import {
  UserProfileActionsTypes,
  UserProfileRecieved
} from '@store/user-profile';
import {
  PlayerSearchActionTypes,
  SearchNewQuery,
  SearchMoreForQuery
} from '@store/player-search';
import { AppPlayerActionTypes } from '@store/app-player';
import { AnalyticsService } from '@core/services/analytics.service';
import { EchoesState } from '@store/reducers';

@Injectable()
export class AnalyticsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<EchoesState>,
    private analytics: AnalyticsService
  ) {}

  @Effect({ dispatch: false })
  trackToken$ = this.actions$.pipe(
    ofType<UserProfileRecieved>(UserProfileActionsTypes.USER_PROFILE_RECIEVED),
    tap(() => this.analytics.trackSignin())
  );

  @Effect({ dispatch: false })
  trackSearch$ = this.actions$.pipe(
    ofType<SearchNewQuery | SearchMoreForQuery>(
      PlayerSearchActionTypes.SEARCH_NEW_QUERY,
      PlayerSearchActionTypes.SEARCH_MORE_FOR_QUERY
    ),
    withLatestFrom(this.store.select(PlayerSearch.getSearchType)),
    tap((states: any[]) => this.analytics.trackSearch(states[1].presets))
  );

  @Effect({ dispatch: false })
  trackPlay$ = this.actions$.pipe(
    ofType(AppPlayerActionTypes.PLAY_STARTED),
    tap(() => this.analytics.trackVideoPlay())
  );
}
