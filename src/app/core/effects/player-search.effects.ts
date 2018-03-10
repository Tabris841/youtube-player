import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import {
  map,
  withLatestFrom,
  switchMap,
  catchError,
  mergeMap,
  filter
} from 'rxjs/operators';

import { YoutubeVideosInfo, YoutubeSearch } from '@core/services';
import { EchoesState } from '@store/reducers';
import * as PlayerSearch from '@store/player-search';
import {
  PlayerSearchActionTypes,
  SearchNewQuery,
  SearchResultsReturned,
  AddPlaylistsToResults,
  AddMetadataToVideos
} from '@store/player-search';

@Injectable()
export class PlayerSearchEffects {
  constructor(
    private actions$: Actions,
    private store: Store<EchoesState>,
    private youtubeSearch: YoutubeSearch,
    private youtubeVideosInfo: YoutubeVideosInfo
  ) {}

  @Effect()
  searchQuery$ = this.actions$.pipe(
    ofType<SearchNewQuery>(PlayerSearchActionTypes.SEARCH_NEW_QUERY),
    map(action => action.payload),
    withLatestFrom(this.store),
    map((latest: any[]) => latest[1]),
    switchMap((store: EchoesState) =>
      this.youtubeSearch
        .resetPageToken()
        .searchFor(
          store.search.searchType,
          store.search.query,
          store.search.queryParams
        )
        .pipe(
          map(
            youtubeResponse =>
              new PlayerSearch.SearchResultsReturned(youtubeResponse)
          ),
          catchError(err => of(new PlayerSearch.ErrorInSearch(err)))
        )
    )
  );

  @Effect()
  resetVideos$ = this.actions$.pipe(
    ofType(
      PlayerSearchActionTypes.SEARCH_NEW_QUERY,
      PlayerSearchActionTypes.PLAYLISTS_SEARCH_START
    ),
    map(() => new PlayerSearch.ResetResults())
  );

  @Effect()
  searchResultsReturned$ = this.actions$.pipe(
    ofType<SearchResultsReturned>(
      PlayerSearchActionTypes.SEARCH_RESULTS_RETURNED
    ),
    map(action => action.payload),
    withLatestFrom(this.store.select(PlayerSearch.getSearchType)),
    map((states: [any[], string]) => {
      if (states[1] === PlayerSearch.CSearchTypes.VIDEO) {
        return new PlayerSearch.AddMetadataToVideos(states[0]);
      }
      return new PlayerSearch.AddPlaylistsToResults(states[0]);
    })
  );

  @Effect()
  addPlaylistsToResults$ = this.actions$.pipe(
    ofType<AddPlaylistsToResults>(
      PlayerSearchActionTypes.ADD_PLAYLISTS_TO_RESULTS
    ),
    map(action => action.payload),
    map(result => new PlayerSearch.AddResults(result.items))
  );

  @Effect()
  addMetadataToVideos$ = this.actions$.pipe(
    ofType<AddMetadataToVideos>(PlayerSearchActionTypes.ADD_METADATA_TO_VIDEOS),
    map(action => action.payload),
    map((medias: { items: GoogleApiYouTubeSearchResource[] }) =>
      medias.items.map(media => media.id.videoId).join(',')
    ),
    mergeMap((mediaIds: string) =>
      this.youtubeVideosInfo
        .fetchVideosData(mediaIds)
        .map((videos: any) => new PlayerSearch.AddResults(videos))
    )
  );

  @Effect()
  searchMoreForQuery$ = this.actions$.pipe(
    ofType(PlayerSearchActionTypes.SEARCH_MORE_FOR_QUERY),
    withLatestFrom(this.store),
    map((latest: any[]) => latest[1]),
    filter((store: EchoesState) => !store.search.isSearching),
    mergeMap((store: EchoesState) => {
      this.youtubeSearch.searchMore(store.search.pageToken.next);
      return this.youtubeSearch
        .searchFor(
          store.search.searchType,
          store.search.query,
          store.search.queryParams
        )
        .map(
          youtubeResponse =>
            new PlayerSearch.SearchResultsReturned(youtubeResponse)
        );
    })
  );

  @Effect()
  searchMoreSearchStarted$ = this.actions$.pipe(
    ofType(PlayerSearchActionTypes.SEARCH_MORE_FOR_QUERY),
    withLatestFrom(this.store.select(PlayerSearch.getIsSearching)),
    filter((states: [any, boolean]) => !states[1]),
    map(() => new PlayerSearch.SearchStarted())
  );

  @Effect()
  updatePreset$ = this.actions$.pipe(
    ofType(PlayerSearchActionTypes.UPDATE_QUERY_PARAM),
    map(() => new PlayerSearch.SearchCurrentQuery())
  );

  @Effect()
  resetVideosAfterParamUpdate$ = this.actions$.pipe(
    ofType(PlayerSearchActionTypes.UPDATE_QUERY_PARAM),
    map(() => new PlayerSearch.ResetResults())
  );

  @Effect()
  resetPageToken$ = this.actions$.pipe(
    ofType(PlayerSearchActionTypes.RESET_PAGE_TOKEN),
    mergeMap(() => of(this.youtubeSearch.resetPageToken())),
    map(() => ({ type: 'PAGE_RESET_DONE' }))
  );

  @Effect()
  searchCurrentQuery$ = this.actions$.pipe(
    ofType(PlayerSearchActionTypes.SEARCH_CURRENT_QUERY),
    withLatestFrom(this.store.select(PlayerSearch.getQuery)),
    map((latest: any[]) => latest[1]),
    map((query: string) => new PlayerSearch.SearchNewQuery(query))
  );

  // Playlists SEARCH EFFECTS
  @Effect()
  playlistsSearchStart$ = this.actions$.pipe(
    ofType(PlayerSearchActionTypes.PLAYLISTS_SEARCH_START),
    withLatestFrom(this.store),
    map((latest: any[]) => latest[1]),
    switchMap((store: EchoesState) =>
      this.youtubeSearch
        .searchForPlaylist(store.search.query, store.search.queryParams)
        .map(
          (youtubeResponse: any) =>
            new PlayerSearch.AddResults(youtubeResponse.items)
        )
    ),
    catchError(err => of(new PlayerSearch.ErrorInSearch(err)))
  );
}
