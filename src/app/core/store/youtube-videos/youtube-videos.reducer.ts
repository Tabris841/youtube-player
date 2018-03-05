import { ActionReducer, Action } from '@ngrx/store';
import {
  YoutubeVideosActions,
  YoutubeVideosTypes
} from './youtube-videos.actions';

export type GoogleApiYoutubeVideo = GoogleApiYouTubeVideoResource | Object;

export interface EchoesVideos {
  results: GoogleApiYoutubeVideo[];
  query: string;
  isSearching: boolean;
}

const initialState: EchoesVideos = {
  results: [],
  query: '',
  isSearching: false
};

export const videos: ActionReducer<EchoesVideos> = (
  state: EchoesVideos = initialState,
  action: YoutubeVideosActions
) => {
  switch (action.type) {
    case YoutubeVideosTypes.ADD:
      return Object.assign({}, state, {
        results: [...state.results, ...action.payload]
      });

    case YoutubeVideosTypes.REMOVE:
      return state;

    case YoutubeVideosTypes.RESET:
      return Object.assign({}, state, { results: [] });

    case YoutubeVideosTypes.SEARCH_START:
      return Object.assign({}, state, {
        isSearching: true
      });

    case YoutubeVideosTypes.SEARCH_ENDED_SUCCESS:
      return Object.assign({}, state, {
        isSearching: false
      });

    case YoutubeVideosTypes.SEARCH_NEW_QUERY:
      return Object.assign({}, state, {
        query: action.payload
      });

    default:
      return state;
  }
};
