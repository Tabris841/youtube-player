import { Action } from '@ngrx/store';

export class AppLayoutActionTypes {
  static SIDEBAR_EXPAND = '[APP LAYOUT] SIDEBAR_EXPAND';
  static SIDEBAR_COLLAPSE = '[APP LAYOUT] SIDEBAR_COLLAPSE';
  static SIDEBAR_TOGGLE = '[APP LAYOUT] SIDEBAR_TOGGLE';
  static APP_VERSION_RECEIVED = '[APP] APP_VERSION_RECEIVED';
  static APP_UPDATE_VERSION = '[APP] APP_UPDATE_VERSION';
  static APP_CHECK_VERSION = '[APP] APP_CHECK_VERSION';
  static APP_THEME_CHANGE = '[App Theme] APP_THEME_CHANGE';
}

export class ReceivedAppVersion implements Action {
  public type = AppLayoutActionTypes.APP_VERSION_RECEIVED;

  constructor(public payload: any) {}
}

export class UpdateAppVersion implements Action {
  public type = AppLayoutActionTypes.APP_UPDATE_VERSION;
  public payload = '';
}

export class CheckVersion implements Action {
  public type = AppLayoutActionTypes.APP_CHECK_VERSION;
  public payload = '';
}

export class ExpandSidebar implements Action {
  public type = AppLayoutActionTypes.SIDEBAR_EXPAND;
  public payload = true;
}

export class CollapseSidebar implements Action {
  public type = AppLayoutActionTypes.SIDEBAR_COLLAPSE;
  public payload = false;
}

export class ToggleSidebar implements Action {
  public type = AppLayoutActionTypes.SIDEBAR_TOGGLE;
  public payload = '';
}

export class ThemeChange implements Action {
  public type = AppLayoutActionTypes.APP_THEME_CHANGE;

  constructor(public payload: string) {}
}

export type AppLayoutAction =
  | ReceivedAppVersion
  | UpdateAppVersion
  | CheckVersion
  | ExpandSidebar
  | CollapseSidebar
  | ToggleSidebar
  | ThemeChange;
