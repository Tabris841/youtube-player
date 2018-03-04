import { ActionReducer, Action } from '@ngrx/store';
import {
  YoutubeVideosActions,
  YoutubeVideosTypes
} from './youtube-videos.actions';
type GoogleApiYoutubeVideo = GoogleApiYouTubeVideoResource | Object;
export interface EchoesVideos extends Array<GoogleApiYoutubeVideo> {}

export const videos: ActionReducer<EchoesVideos> = (
  state: EchoesVideos = [],
  action: YoutubeVideosActions
) => {
  switch (action.type) {
    case YoutubeVideosTypes.ADD:
      return [...state, ...action.payload];

    case YoutubeVideosTypes.REMOVE:
      return state;

    case YoutubeVideosTypes.RESET:
      return [];

    case YoutubeVideosTypes.UPDATE_METADATA:
      const amountOfResults = 50;
      const bottomLimit =
        state.length === 0 ? state.length : state.length - amountOfResults;
      const copyOfLastState = [...state].filter(
        (video, index) => index < bottomLimit
      );
      return [...copyOfLastState, ...action.payload];

    default:
      return state;
  }
};
