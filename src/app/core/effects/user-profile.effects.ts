import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';

import {
  UserProfileActions,
  GoogleBasicProfile,
  UserProfileActionsTypes,
  UpdateToken,
  UpdateData,
  UpdatePageToken,
  UserProfileRecieved,
  UserSigninSuccess
} from '@store/user-profile';
import * as UserActions from '@store/user-profile';
import { UserProfile, Authorization } from '@core/services';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

@Injectable()
export class UserProfileEffects {
  constructor(
    private actions$: Actions,
    private userProfile: UserProfile,
    private auth: Authorization
  ) {}

  @Effect()
  init$ = defer(() => this.auth.loadAuth()).map(
    (googleUser: gapi.auth2.GoogleUser) =>
      new UserActions.UserSigninSuccess(googleUser)
  );

  @Effect()
  updateToken$ = this.actions$.pipe(
    ofType<UpdateToken>(UserProfileActionsTypes.UPDATE_TOKEN),
    map(action => action.payload),
    map((token: string) => (this.auth.accessToken = token)),
    switchMap(token =>
      this.userProfile.getPlaylists(true).pipe(
        catchError((error: Error) => {
          console.log(`error in fetching user's playlists ${error}`);
          return of(error);
        })
      )
    ),
    map(response => new UserActions.UpdateData(response))
  );

  @Effect()
  addUserPlaylists$ = this.actions$.pipe(
    ofType<UpdateData>(UserProfileActionsTypes.UPDATE),
    map(action => action.payload),
    map((data: any) => new UserActions.AddPlaylists(data.items))
  );

  @Effect()
  updateNextPageToken$ = this.actions$.pipe(
    ofType<UpdateData>(UserProfileActionsTypes.UPDATE),
    map(action => action.payload),
    map(data => {
      const nextPageToken = data.nextPageToken;
      return nextPageToken
        ? new UserActions.UpdatePageToken(data.nextPageToken)
        : new UserActions.UserProfileCompleted();
    })
  );

  @Effect()
  getMorePlaylists$ = this.actions$.pipe(
    ofType<UpdatePageToken>(UserProfileActionsTypes.UPDATE_NEXT_PAGE_TOKEN),
    map(action => action.payload),
    switchMap((pageToken: string) => {
      this.userProfile.updatePageToken(pageToken);
      return this.userProfile.getPlaylists(false);
    }),
    map(response => new UserActions.UpdateData(response))
  );

  @Effect()
  userProfileRecieved$ = this.actions$.pipe(
    ofType<UserProfileRecieved>(UserProfileActionsTypes.USER_PROFILE_RECIEVED),
    map(action => action.payload),
    map(profile => this.userProfile.toUserJson(profile)),
    map(
      (profile: GoogleBasicProfile) =>
        new UserActions.UpdateUserProfile(profile)
    )
  );

  // SIGN IN/OUT EFFECTS
  @Effect()
  userSignin$ = this.actions$.pipe(
    ofType(UserProfileActionsTypes.USER_SIGNIN),
    map(() => new UserActions.UserSigninStart())
  );

  @Effect()
  userSigninStart$ = this.actions$.pipe(
    ofType(UserProfileActionsTypes.USER_SIGNIN_START),
    switchMap(() =>
      this.auth
        .signIn()
        .pipe(catchError(error => this.auth.handleFailedLogin(error)))
    ),
    map((response: any) => new UserActions.UserSigninSuccess(response))
  );

  @Effect({ dispatch: false })
  userSigninSuccess$ = this.actions$.pipe(
    ofType(UserProfileActionsTypes.USER_SIGNIN_SUCCESS),
    tap((response: any) => this.auth.setAuthTimer(response))
  );

  @Effect()
  updateTokenAfterSigninSuccess$ = this.actions$.pipe(
    ofType<UserSigninSuccess>(UserProfileActionsTypes.USER_SIGNIN_SUCCESS),
    map(action => action.payload),
    map(
      (googleUser: gapi.auth2.GoogleUser) =>
        new UserActions.UpdateToken(this.auth.extractToken(googleUser))
    )
  );

  @Effect()
  updateProfileAfterSigninSuccess$ = this.actions$.pipe(
    ofType<UserSigninSuccess>(UserProfileActionsTypes.USER_SIGNIN_SUCCESS),
    map(action => action.payload),
    map(
      (googleUser: gapi.auth2.GoogleUser) =>
        new UserActions.UserProfileRecieved(googleUser.getBasicProfile())
    )
  );

  @Effect()
  userSignout$ = this.actions$.pipe(
    ofType(UserProfileActionsTypes.USER_SIGNOUT),
    switchMap(() => this.auth.signOut()),
    map(() => new UserActions.UserSignoutSuccess())
  );

  @Effect({ dispatch: false })
  userSignoutSuccess$ = this.actions$.pipe(
    ofType(UserProfileActionsTypes.USER_SIGNOUT_SUCCESS),
    tap(() => this.auth.disposeAutoSignIn())
  );
}
