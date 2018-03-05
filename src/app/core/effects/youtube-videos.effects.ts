import { Store, Action } from '@ngrx/store';
import { EchoesState } from '../store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { YoutubeSearch } from '../services/youtube-search.service';
import { YoutubeVideosInfo } from '../services/youtube-videos-info.service';
import {
  SearchNewQuery,
  Reset,
  SearchStart,
  YoutubeVideosTypes,
  SearchEndedSuccess,
  AddVideos,
  SearchMore
} from '../store/youtube-videos';

@Injectable()
export class YoutubeVideosEffects {
  constructor(
    private actions$: Actions,
    private store: Store<EchoesState>,
    private youtubeSearch: YoutubeSearch,
    private youtubeVideosInfo: YoutubeVideosInfo
  ) {}

  @Effect()
  resetVideos$: Observable<Action> = this.actions$.pipe(
    ofType(YoutubeVideosTypes.SEARCH_NEW_QUERY),
    map((action: SearchNewQuery) => action.payload),
    filter((query: string) => this.youtubeSearch.isNewSearchQuery(query)),
    map(() => this.youtubeSearch.resetPageToken()),
    map(() => new Reset())
  );

  @Effect()
  startSearch$: Observable<Action> = this.actions$.pipe(
    ofType(YoutubeVideosTypes.SEARCH_NEW_QUERY),
    map((action: SearchNewQuery) => new SearchStart(action.payload))
  );

  @Effect()
  searchVideos$ = this.actions$.pipe(
    ofType(YoutubeVideosTypes.SEARCH_START),
    map((action: SearchStart) => action.payload),
    switchMap((query: string) => this.youtubeSearch.search(query)),
    map(mediaItems => mediaItems.map(video => video.id.videoId)),
    map(mediaIds => new SearchEndedSuccess(mediaIds))
  );

  @Effect()
  fetchMetadata$ = this.actions$.pipe(
    ofType(YoutubeVideosTypes.SEARCH_ENDED_SUCCESS),
    map((action: SearchEndedSuccess) => action.payload),
    map(mediaIds => mediaIds.join(',')),
    switchMap(mediaIds => this.youtubeVideosInfo.fetchVideoData(mediaIds)),
    map(videos => new AddVideos(videos))
  );

  @Effect()
  searchMoreVideos$ = this.actions$.pipe(
    ofType(YoutubeVideosTypes.SEARCH_MORE),
    map(() => this.youtubeSearch.searchMore()),
    withLatestFrom(this.store.select(state => state.videos)),
    map(state => new SearchStart(state[1].query))
  );
}
