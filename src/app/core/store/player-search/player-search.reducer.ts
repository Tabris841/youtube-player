import {
  IPlayerSearch,
  CSearchTypes,
  CPresetTypes
} from './player-search.interfaces';

import {
  PlayerSearchActionTypes,
  PlayerSearchActions
} from './player-search.actions';
export * from './player-search.interfaces';

const initialState: IPlayerSearch = {
  query: '',
  filter: '',
  searchType: CSearchTypes.VIDEO,
  queryParams: {
    preset: '',
    duration: -1
  },
  presets: [
    { label: 'Any', value: '' },
    { label: 'Albums', value: CPresetTypes.FULL_ALBUMS },
    { label: 'Live', value: CPresetTypes.LIVE }
  ],
  pageToken: {
    next: '',
    prev: ''
  },
  isSearching: false,
  results: []
};

export function search(
  state: IPlayerSearch = initialState,
  action: PlayerSearchActions
): IPlayerSearch {
  switch (action.type) {
    case PlayerSearchActionTypes.UPDATE_QUERY: {
      return { ...state, query: action.payload };
    }

    case PlayerSearchActionTypes.SEARCH_NEW_QUERY:
      return {
        ...state,
        query: action.payload,
        isSearching: true
      };

    case PlayerSearchActionTypes.UPDATE_QUERY_PARAM:
      const queryParams = { ...state.queryParams, ...action.payload };
      return { ...state, queryParams };

    case PlayerSearchActionTypes.SEARCH_RESULTS_RETURNED:
      const { nextPageToken, prevPageToken } = action.payload;
      const statePageToken = state.pageToken;
      const pageToken = {
        next: nextPageToken || statePageToken.next,
        prev: prevPageToken || statePageToken.prev
      };
      return { ...state, pageToken };

    case PlayerSearchActionTypes.SEARCH_STARTED:
      return { ...state, isSearching: true };

    case PlayerSearchActionTypes.ADD_RESULTS:
      return {
        ...state,
        results: [...state.results, ...action.payload],
        isSearching: false
      };

    case PlayerSearchActionTypes.RESET_RESULTS:
      return { ...state, results: [] };

    case PlayerSearchActionTypes.SEARCH_TYPE_UPDATE: {
      return {
        ...state,
        searchType: action.payload
      };
    }
    case PlayerSearchActionTypes.PLAYLISTS_SEARCH_START: {
      return { ...state, isSearching: true };
    }

    default:
      // upgrade policy - for when the initialState has changed
      return { ...initialState, ...state };
  }
}
