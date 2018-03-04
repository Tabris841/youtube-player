import { Action } from '@ngrx/store';

export enum NowPlaylistTypes {
  QUEUE_LOAD_VIDEO = '[NOW PLAYLIST] QUEUE_LOAD_VIDEO',
  QUEUE = '[NOW PLAYLIST] QUEUE',
  QUEUE_LOAD_VIDEO_SUCCESS = '[NOW PLAYLIST] QUEUE_LOAD_VIDEO_SUCCESS',
  SELECT = '[NOW PLAYLIST] SELECT',
  REMOVE = '[NOW PLAYLIST] REMOVE',
  UPDATE_INDEX = '[NOW PLAYLIST] UPDATE_INDEX',
  QUEUE_FAILED = '[NOW PLAYLIST] QUEUE_FAILED',
  FILTER_CHANGE = '[NOW PLAYLIST] FILTER_CHANGE',
  REMOVE_ALL = '[NOW PLAYLIST] REMOVE_ALL',
  SELECT_NEXT = '[NOW PLAYLIST] SELECT_NEXT',
  SELECT_PREVIOUS = '[NOW PLAYLIST] SELECT_PREVIOUS',
  QUEUE_VIDEOS = '[NOW PLAYLIST] QUEUE_VIDEOS'
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

export class ChangeFilter implements Action {
  readonly type = NowPlaylistTypes.FILTER_CHANGE;

  constructor(public payload: string) {}
}

export class SelectNext implements Action {
  readonly type = NowPlaylistTypes.SELECT_NEXT;
}

export class RemoveAll implements Action {
  readonly type = NowPlaylistTypes.REMOVE_ALL;
}

export class SelectPrevious implements Action {
  readonly type = NowPlaylistTypes.SELECT_PREVIOUS;
}

export type NowPlaylistActions =
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
