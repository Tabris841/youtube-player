import { Action } from '@ngrx/store';

import { GoogleBasicProfile } from './user-profile.reducer';

export enum ActionsTypes {
  UPDATE = '[UserProfile] UPDATE',
  ADD_PLAYLISTS = '[UserProfile] ADD_PLAYLISTS',
  UPDATE_TOKEN = '[UserProfile] UPDATE_TOKEN',
  UPDATE_NEXT_PAGE_TOKEN = '[UserProfile] UPDATE_NEXT_PAGE_TOKEN',
  USER_PROFILE_COMPLETED = '[UserProfile] USER_PROFILE_COMPLETED',
  UPDATE_USER_PROFILE = '[UserProfile] UPDATE_USER_PROFILE',
  USER_PROFILE_RECIEVED = '[UserProfile] USER_PROFILE_RECIEVED',
  VIEWED_PLAYLIST = '[UserProfile] VIEWED_PLAYLIST',
  USER_SIGNIN = '[UserProfile] USER_SIGNIN',
  USER_SIGNIN_START = '[UserProfile] USER_SIGNIN_START',
  USER_SIGNIN_SUCCESS = '[UserProfile] USER_SIGNIN_SUCCESS',
  USER_SIGNOUT = '[UserProfile] USER_SIGNOUT',
  USER_SIGNOUT_SUCCESS = '[UserProfile] USER_SIGNOUT_SUCCESS'
}

export class SetViewPlaylist implements Action {
  readonly type = ActionsTypes.VIEWED_PLAYLIST;

  constructor(public payload: string) {}
}

export class UpdateData implements Action {
  readonly type = ActionsTypes.UPDATE;

  constructor(public payload: any) {}
}

export class AddPlaylists implements Action {
  readonly type = ActionsTypes.ADD_PLAYLISTS;

  constructor(public payload: Array<any>) {}
}

export class UpdateToken implements Action {
  readonly type = ActionsTypes.UPDATE_TOKEN;

  constructor(public payload: string) {}
}

export class UpdatePageToken implements Action {
  readonly type = ActionsTypes.UPDATE_NEXT_PAGE_TOKEN;

  constructor(public payload: string) {}
}

export class UserProfileCompleted implements Action {
  readonly type = ActionsTypes.USER_PROFILE_COMPLETED;
}

export class UserProfileRecieved implements Action {
  readonly type = ActionsTypes.USER_PROFILE_RECIEVED;

  constructor(public payload: any) {}
}

export class UpdateUserProfile implements Action {
  readonly type = ActionsTypes.UPDATE_USER_PROFILE;

  constructor(public payload: GoogleBasicProfile) {}
}

export class UserSignin implements Action {
  readonly type = ActionsTypes.USER_SIGNIN;
}

export class UserSigninStart implements Action {
  readonly type = ActionsTypes.USER_SIGNIN_START;
}

export class UserSigninSuccess implements Action {
  readonly type = ActionsTypes.USER_SIGNIN_SUCCESS;
  constructor(public payload: gapi.auth2.GoogleUser) {}
}

export class UserSignout implements Action {
  readonly type = ActionsTypes.USER_SIGNOUT;
}

export class UserSignoutSuccess implements Action {
  readonly type = ActionsTypes.USER_SIGNOUT_SUCCESS;
}

export type Actions =
  | SetViewPlaylist
  | UpdateData
  | AddPlaylists
  | UpdateToken
  | UpdatePageToken
  | UserProfileRecieved
  | UpdateUserProfile
  | UserSignin
  | UserSigninStart
  | UserSigninSuccess
  | UserSignout
  | UserSignoutSuccess
  | UserProfileCompleted;
