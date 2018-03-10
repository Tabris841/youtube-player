import { Action } from '@ngrx/store';

export enum NowPlaylistTypes {
  QUEUE_LOAD_VIDEO = '[NowPlaylist] QUEUE_LOAD_VIDEO',
  QUEUE = '[NowPlaylist] QUEUE',
  QUEUE_LOAD_VIDEO_SUCCESS = '[NowPlaylist] QUEUE_LOAD_VIDEO_SUCCESS',
  SELECT = '[NowPlaylist] SELECT',
  REMOVE = '[NowPlaylist] REMOVE',
  UPDATE_INDEX = '[NowPlaylist] UPDATE_INDEX',
  QUEUE_FAILED = '[NowPlaylist] QUEUE_FAILED',
  FILTER_CHANGE = '[NowPlaylist] FILTER_CHANGE',
  REMOVE_ALL = '[NowPlaylist] REMOVE_ALL',
  SELECT_NEXT = '[NowPlaylist] SELECT_NEXT',
  SELECT_PREVIOUS = '[NowPlaylist] SELECT_PREVIOUS',
  QUEUE_VIDEOS = '[NowPlaylist] QUEUE_VIDEOS',
  MEDIA_ENDED = '[NowPlaylist] MEDIA_ENDED',
  TOGGLE_REPEAT = '[NowPlaylist] TOGGLE_REPEAT',
  SELECT_AND_SEEK_TO_TIME = '[NowPlaylist] SELECT_AND_SEEK_TO_TIME',
  LOAD_PLAYLIST_START = '[NowPlaylist] LOAD_PLAYLIST_START',
  LOAD_PLAYLIST_END = '[NowPlaylist] LOAD_PLAYLIST_END',
  PLAY_PLAYLIST = '[NowPlaylist] PLAY_PLAYLIST',
  PLAY_PLAYLIST_START = '[NowPlaylist] PLAY_PLAYLIST_START',
  PLAYER_STATE_CHANGE = '[NowPlaylist] PLAYER_STATE_CHANGE'
}

export class ToggleRepeat implements Action {
  readonly type = NowPlaylistTypes.TOGGLE_REPEAT;
}

export class SeekTo implements Action {
  readonly type = NowPlaylistTypes.SELECT_AND_SEEK_TO_TIME;

  constructor(
    public payload: { time: string; media: GoogleApiYouTubeVideoResource }
  ) {}
}

export class QueueLoadVideo implements Action {
  readonly type = NowPlaylistTypes.QUEUE_LOAD_VIDEO;

  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class QueueVideo implements Action {
  readonly type = NowPlaylistTypes.QUEUE;

  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class UpdateIndexByMedia implements Action {
  readonly type = NowPlaylistTypes.UPDATE_INDEX;

  constructor(public payload: string) {}
}

export class QueueFailed implements Action {
  readonly type = NowPlaylistTypes.QUEUE_FAILED;

  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class QueueVideos implements Action {
  readonly type = NowPlaylistTypes.QUEUE_VIDEOS;

  constructor(public payload: any) {}
}

export class SelectVideo implements Action {
  readonly type = NowPlaylistTypes.SELECT;

  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class RemoveVideo implements Action {
  readonly type = NowPlaylistTypes.REMOVE;

  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class FilterChange implements Action {
  readonly type = NowPlaylistTypes.FILTER_CHANGE;

  constructor(public payload: string) {}
}

export class ChangeFilter implements Action {
  readonly type = NowPlaylistTypes.FILTER_CHANGE;

  constructor(public payload: string) {}
}

export class PlaylistAction implements Action {
  readonly type = NowPlaylistTypes.PLAY_PLAYLIST;

  constructor(public payload: string) {}
}

export class PlaylistStartAction implements Action {
  readonly type = NowPlaylistTypes.PLAY_PLAYLIST_START;

  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class LoadPlaylistAction implements Action {
  readonly type = NowPlaylistTypes.LOAD_PLAYLIST_START;

  constructor(public payload: string) {}
}

export class LoadPlaylistEndAction implements Action {
  readonly type = NowPlaylistTypes.LOAD_PLAYLIST_END;

  constructor(public payload: GoogleApiYouTubeVideoResource[]) {}
}

export class MediaEnded implements Action {
  readonly type = NowPlaylistTypes.MEDIA_ENDED;

  constructor(public payload?: any) {}
}

export class SelectNext implements Action {
  readonly type = NowPlaylistTypes.SELECT_NEXT;
}

export class RemoveAll implements Action {
  readonly type = NowPlaylistTypes.REMOVE_ALL;

  constructor(public payload?: any) {}
}

export class SelectPrevious implements Action {
  readonly type = NowPlaylistTypes.SELECT_PREVIOUS;
}

export class PlayerStateChange implements Action {
  readonly type = NowPlaylistTypes.PLAYER_STATE_CHANGE;

  constructor(public payload: YT.OnStateChangeEvent) {}
}

export type NowPlaylistActions =
  | LoadPlaylistAction
  | PlayerStateChange
  | MediaEnded
  | LoadPlaylistEndAction
  | PlaylistStartAction
  | PlaylistAction
  | FilterChange
  | SeekTo
  | ToggleRepeat
  | QueueLoadVideo
  | QueueVideo
  | UpdateIndexByMedia
  | QueueFailed
  | QueueVideos
  | SelectVideo
  | RemoveVideo
  | ChangeFilter
  | SelectNext
  | RemoveAll
  | SelectPrevious;
