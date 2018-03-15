import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

// reducers
import { IAppPlayer, player } from './app-player';
import { INowPlaylist, nowPlaylist } from './now-playlist';
import { IUserProfile, user } from './user-profile';
import { IPlayerSearch, search } from './player-search';
import { IAppSettings, appLayout } from './app-layout';
import { RouterStateUrl } from './router-store';

// The top level Echoes Player application interface
// each reducer is reponsible for manipulating a certain state
export interface EchoesState {
  player: IAppPlayer;
  nowPlaylist: INowPlaylist;
  user: IUserProfile;
  search: IPlayerSearch;
  appLayout: IAppSettings;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export let EchoesReducers: ActionReducerMap<EchoesState> = {
  player,
  nowPlaylist,
  user,
  search,
  appLayout,
  router: fromRouter.routerReducer
};
