import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { EchoesState } from '@store/reducers';
import { NowPlaylistService, VersionCheckerService } from '@core/services';
import * as AppLayout from '@store/app-layout';
import { AppLayoutActionTypes } from '@store/app-layout';
import { map } from 'rxjs/operators';

@Injectable()
export class AppSettingsEffects {
  constructor(
    public actions$: Actions,
    public store: Store<EchoesState>,
    public versionCheckerService: VersionCheckerService
  ) {}

  @Effect({ dispatch: false })
  updateAppVersion$ = this.actions$.pipe(
    ofType(AppLayoutActionTypes.APP_UPDATE_VERSION),
    map(() => this.versionCheckerService.updateVersion())
  );

  @Effect({ dispatch: false })
  checkForNewAppVersion$ = this.actions$.pipe(
    ofType(AppLayoutActionTypes.APP_CHECK_VERSION),
    map(() => this.versionCheckerService.checkForVersion())
  );
}
