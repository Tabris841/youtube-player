import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { ActionsTypes, Actions } from './user-profile.actions';
import { EchoesState } from '../';

export interface IUserProfile {
  access_token: string;
  playlists: GoogleApiYouTubePlaylistResource[];
  data?: {};
  nextPageToken?: string;
  profile: GoogleBasicProfile;
  viewedPlaylist?: string;
}

export interface GoogleBasicProfile {
  name?: string;
  imageUrl?: string;
}

const initialUserState: IUserProfile = {
  access_token: '',
  playlists: [],
  data: {},
  nextPageToken: '',
  profile: {},
  viewedPlaylist: ''
};

export function user(state = initialUserState, action: Actions): IUserProfile {
  switch (action.type) {
    case ActionsTypes.ADD_PLAYLISTS:
      return { ...state, playlists: [...state.playlists, ...action.payload] };

    case ActionsTypes.UPDATE_TOKEN:
      return { ...state, access_token: action.payload, playlists: [] };

    case ActionsTypes.USER_SIGNOUT_SUCCESS:
      return { ...initialUserState };

    case ActionsTypes.UPDATE:
      return { ...state, data: action.payload };

    case ActionsTypes.UPDATE_NEXT_PAGE_TOKEN:
      return { ...state, nextPageToken: action.payload };

    case ActionsTypes.UPDATE_USER_PROFILE:
      return { ...state, profile: action.payload };

    case ActionsTypes.VIEWED_PLAYLIST:
      return { ...state, viewedPlaylist: action.payload };

    default:
      return state;
  }
}
