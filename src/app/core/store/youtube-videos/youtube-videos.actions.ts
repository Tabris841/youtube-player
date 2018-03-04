import { Action } from '@ngrx/store';

export enum YoutubeVideosTypes {
  ADD = '[YoutubeVideos] ADD_VIDEOS',
  REMOVE = '[YoutubeVideos] REMOVE',
  RESET = '[YoutubeVideos] RESET',
  UPDATE_METADATA = '[YoutubeVideos] UPDATE_METADATA'
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

export type YoutubeVideosActions =
  | AddVideos
  | RemoveVideos
  | Reset
  | UpdateMetaData;
