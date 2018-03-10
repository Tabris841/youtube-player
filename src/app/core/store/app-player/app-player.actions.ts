import { Action } from '@ngrx/store';

export class AppPlayerActionTypes {
  static PLAY = '[Player] PLAY';
  static PAUSE = '[Player] PAUSE';
  static SETUP_PLAYER = '[Player] SETUP_PLAYER';
  static LOAD_AND_PLAY = '[Player] LOAD_AND_PLAY';
  static QUEUE = '[Player] REMOVE';
  static PLAY_STARTED = '[Player] PLAY_STARTED';
  static TOGGLE_PLAYER = '[Player] TOGGLE_PLAYER';
  static UPDATE_STATE = '[Player] STATE_CHANGE';
  static PLAYER_STATE_CHANGE = '[Player] PLAYER_STATE_CHANGE';
  static FULLSCREEN = '[Player] FULLSCREEN';
  static RESET = '[Player] RESET';
  static LOAD_NEXT_TRACK = '[Player] LOAD_NEXT_TRACK';
  static RESET_FULLSCREEN = '[Player] RESET_FULLSCREEN';
}

export class PlayVideo implements Action {
  readonly type = AppPlayerActionTypes.PLAY;

  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class PauseVideo implements Action {
  readonly type = AppPlayerActionTypes.PAUSE;
  constructor(public payload = '') {}
}

export class TogglePlayer implements Action {
  readonly type = AppPlayerActionTypes.TOGGLE_PLAYER;

  constructor(public payload: boolean = true) {}
}

export class LoadNextTrack implements Action {
  readonly type = AppPlayerActionTypes.LOAD_NEXT_TRACK;
}

export class LoadAndPlay implements Action {
  readonly type = AppPlayerActionTypes.LOAD_AND_PLAY;

  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class PlayStarted implements Action {
  readonly type = AppPlayerActionTypes.PLAY_STARTED;

  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class UpdateState implements Action {
  readonly type = AppPlayerActionTypes.UPDATE_STATE;

  constructor(public payload: number) {}
}

export class FullScreen implements Action {
  readonly type = AppPlayerActionTypes.FULLSCREEN;
}

export class ResetFullScreen implements Action {
  readonly type = AppPlayerActionTypes.RESET_FULLSCREEN;
}

export class Reset implements Action {
  readonly type = AppPlayerActionTypes.RESET;
}

export class SetupPlayer implements Action {
  readonly type = AppPlayerActionTypes.SETUP_PLAYER;

  constructor(public payload: any) {}
}

export class PlayerStateChange implements Action {
  readonly type = AppPlayerActionTypes.PLAYER_STATE_CHANGE;

  constructor(public payload: YT.OnStateChangeEvent) {}
}

export type AppPlayerActions =
  | PlayVideo
  | TogglePlayer
  | LoadNextTrack
  | LoadAndPlay
  | PlayStarted
  | UpdateState
  | FullScreen
  | Reset
  | any;
