import { Action } from '@ngrx/store';

export enum YoutubeVideosTypes {
  ADD = '[YoutubeVideos] ADD_VIDEOS',
  REMOVE = '[YoutubeVideos] REMOVE',
  RESET = '[YoutubeVideos] RESET',
  UPDATE_METADATA = '[YoutubeVideos] UPDATE_METADATA',
  SEARCH_NEW_QUERY = '[YoutubeVideos] SEARCH_NEW_QUERY',
  SEARCH_ENDED_SUCCESS = '[YoutubeVideos] SEARCH_ENDED_SUCCESS',
  SEARCH_START = '[YoutubeVideos] SEARCH_START',
  SEARCH_MORE = '[YoutubeVideos] SEARCH_MORE'
}

export class AddVideos implements Action {
  readonly type = YoutubeVideosTypes.ADD;

  constructor(public payload: GoogleApiYouTubeVideoResource[]) {}
}

export class RemoveVideos implements Action {
  readonly type = YoutubeVideosTypes.REMOVE;
}

export class Reset implements Action {
  readonly type = YoutubeVideosTypes.RESET;
}

export class UpdateMetaData implements Action {
  readonly type = YoutubeVideosTypes.UPDATE_METADATA;

  constructor(public payload: GoogleApiYouTubeVideoResource[]) {}
}

export class SearchNewQuery implements Action {
  readonly type = YoutubeVideosTypes.SEARCH_NEW_QUERY;

  constructor(public payload: string) {}
}

export class SearchEndedSuccess implements Action {
  readonly type = YoutubeVideosTypes.SEARCH_ENDED_SUCCESS;

  constructor(public payload: GoogleApiYouTubeVideoResource[]) {}
}

export class SearchStart implements Action {
  readonly type = YoutubeVideosTypes.SEARCH_START;

  constructor(public payload: string) {}
}

export class SearchMore implements Action {
  readonly type = YoutubeVideosTypes.SEARCH_MORE;
}

export type YoutubeVideosActions =
  | AddVideos
  | RemoveVideos
  | Reset
  | UpdateMetaData
  | SearchNewQuery
  | SearchEndedSuccess
  | SearchStart
  | SearchMore;
