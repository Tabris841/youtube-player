import { Store } from '@ngrx/store';

import { AppLayoutActionTypes, AppLayoutAction } from './app-layout.actions';
import { Themes, DEFAULT_THEME } from '../../../app.themes';

export interface IAppSettings {
  sidebarExpanded: boolean;
  requestInProcess: boolean;
  theme: string;
  themes: string[];
}
const initialState: IAppSettings = {
  sidebarExpanded: true,
  requestInProcess: false,
  theme: DEFAULT_THEME,
  themes: Themes.sort()
};

export function appLayout(
  state: IAppSettings = initialState,
  action: AppLayoutAction
): IAppSettings {
  switch (action.type) {
    case AppLayoutActionTypes.SIDEBAR_EXPAND:
      return { ...state, sidebarExpanded: true };

    case AppLayoutActionTypes.SIDEBAR_COLLAPSE:
      return { ...state, sidebarExpanded: false };

    case AppLayoutActionTypes.SIDEBAR_TOGGLE:
      return { ...state, sidebarExpanded: !state.sidebarExpanded };

    case AppLayoutActionTypes.APP_THEME_CHANGE: {
      return { ...state, theme: action.payload };
    }

    default:
      return { ...initialState, ...state, themes: [...Themes.sort()] };
  }
}

export function getSidebarExpanded($state: Store<IAppSettings>) {
  return $state.select(state => state.sidebarExpanded);
}
