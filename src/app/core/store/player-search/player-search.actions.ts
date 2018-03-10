import { Action } from '@ngrx/store';

export enum PlayerSearchActionTypes {
  UPDATE_FILTER = '[PlayerSearch] UPDATE_FILTER',
  UPDATE_QUERY_PARAM = '[PlayerSearch] UPDATE_QUERY_PARAM',
  UPDATE_QUERY = '[PlayerSearch] UPDATE_QUERY',
  SEARCH_NEW_QUERY = '[PlayerSearch] SEARCH_NEW_QUERY',
  SEARCH_MORE_FOR_QUERY = '[PlayerSearch] SEARCH_MORE_FOR_QUERY',
  GET_SUGGESTIONS = '[PlayerSearch] GET_SUGGESTIONS',
  RESET_PAGE_TOKEN = '[PlayerSearch] RESET_PAGE_TOKEN',
  SEARCH_RESULTS_RETURNED = '[PlayerSearch] SERACH_RESULTS_RETURNED',
  SEARCH_CURRENT_QUERY = '[PlayerSearch] SEARCH_CURRENT_QUERY',
  SEARCH_STARTED = '[PlayerSearch] SEARCH_STARTED',
  SEARCH_TYPE_UPDATE = '[PlayerSearch] SEARCH_TYPE_UPDATE',
  ADD_RESULTS = '[PlayerSearch] ADD_RESULTS',
  RESET_RESULTS = '[PlayerSearch] RESET_RESULTS',
  ERROR_RESULTS = '[PlayerSearch] ERROR_RESULTS',
  ADD_PLAYLISTS_TO_RESULTS = '[PlayerSearch] ADD_PLAYLISTS_TO_RESULTS',
  ADD_METADATA_TO_VIDEOS = '[PlayerSearch] ADD_METADATA_TO_VIDEOS',
  PLAYLISTS_SEARCH_START = '[PlayerSearch] PLAYLISTS_SEARCH_START'
}

export class AddPlaylistsToResults implements Action {
  readonly type = PlayerSearchActionTypes.ADD_PLAYLISTS_TO_RESULTS;

  constructor(public payload) {}
}

export class AddMetadataToVideos implements Action {
  readonly type = PlayerSearchActionTypes.ADD_METADATA_TO_VIDEOS;

  constructor(public payload) {}
}

export class PlaylistsSearchStart implements Action {
  readonly type = PlayerSearchActionTypes.PLAYLISTS_SEARCH_START;
}

export class GetSuggestions implements Action {
  readonly type = PlayerSearchActionTypes.GET_SUGGESTIONS;

  constructor(public payload: string) {}
}

export class SearchCurrentQuery implements Action {
  readonly type = PlayerSearchActionTypes.SEARCH_CURRENT_QUERY;
}

export class SearchNewQuery implements Action {
  readonly type = PlayerSearchActionTypes.SEARCH_NEW_QUERY;

  constructor(public payload: string) {}
}

export class SearchMoreForQuery implements Action {
  readonly type = PlayerSearchActionTypes.SEARCH_MORE_FOR_QUERY;
}

export class UpdateFilter implements Action {
  readonly type = PlayerSearchActionTypes.UPDATE_FILTER;
}

export class UpdateQueryParam implements Action {
  readonly type = PlayerSearchActionTypes.UPDATE_QUERY_PARAM;

  constructor(public payload: any) {}
}

export class ResetPageToken implements Action {
  readonly type = PlayerSearchActionTypes.RESET_PAGE_TOKEN;
}

export class SearchResultsReturned implements Action {
  readonly type = PlayerSearchActionTypes.SEARCH_RESULTS_RETURNED;

  constructor(public payload: any) {}
}

export class SearchStarted implements Action {
  readonly type = PlayerSearchActionTypes.SEARCH_STARTED;
}

export class ResetResults implements Action {
  readonly type = PlayerSearchActionTypes.RESET_RESULTS;
}

export class ErrorInSearch implements Action {
  readonly type = PlayerSearchActionTypes.ERROR_RESULTS;

  constructor(public payload: any) {}
}

export class UpdateSearchType implements Action {
  readonly type = PlayerSearchActionTypes.SEARCH_TYPE_UPDATE;

  constructor(public payload: string) {}
}

export class UpdateQueryAction implements Action {
  readonly type = PlayerSearchActionTypes.UPDATE_QUERY;

  constructor(public payload: string) {}
}

export class AddResults implements Action {
  readonly type = PlayerSearchActionTypes.ADD_RESULTS;

  constructor(public payload: GoogleApiYouTubeVideoResource[]) {}
}

export type PlayerSearchActions =
  | AddPlaylistsToResults
  | AddMetadataToVideos
  | PlaylistsSearchStart
  | GetSuggestions
  | SearchCurrentQuery
  | SearchNewQuery
  | SearchMoreForQuery
  | UpdateFilter
  | UpdateQueryParam
  | ResetPageToken
  | SearchResultsReturned
  | SearchStarted
  | ResetResults
  | ErrorInSearch
  | UpdateSearchType
  | AddResults
  | UpdateQueryAction;
