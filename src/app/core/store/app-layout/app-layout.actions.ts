import { Action } from '@ngrx/store';

export enum AppLayoutActionTypes {
  SIDEBAR_EXPAND = '[APP LAYOUT] SIDEBAR_EXPAND',
  SIDEBAR_COLLAPSE = '[APP LAYOUT] SIDEBAR_COLLAPSE',
  SIDEBAR_TOGGLE = '[APP LAYOUT] SIDEBAR_TOGGLE',
  APP_THEME_CHANGE = '[App Theme] APP_THEME_CHANGE'
}

export class ExpandSidebar implements Action {
  readonly type = AppLayoutActionTypes.SIDEBAR_EXPAND;
  public payload = true;
}

export class CollapseSidebar implements Action {
  readonly type = AppLayoutActionTypes.SIDEBAR_COLLAPSE;
  public payload = false;
}

export class ThemeChange implements Action {
  readonly type = AppLayoutActionTypes.APP_THEME_CHANGE;

  constructor(public payload: string) {}
}

export class ToggleSidebar implements Action {
  readonly type = AppLayoutActionTypes.SIDEBAR_TOGGLE;
}

export type AppLayoutAction =
  | ToggleSidebar
  | ThemeChange
  | ExpandSidebar
  | CollapseSidebar;
