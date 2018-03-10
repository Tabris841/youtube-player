import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export enum RouterStoreTypes {
  GO = '[Router] Go',
  BACK = '[Router] Back',
  FORWARD = '[Router] Forward'
}

export class Go implements Action {
  readonly type = RouterStoreTypes.GO;

  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class Back implements Action {
  readonly type = RouterStoreTypes.BACK;
}

export class Forward implements Action {
  readonly type = RouterStoreTypes.FORWARD;
}

export type RouterStoreActions = Go | Back | Forward;
