import { NgModule } from '@angular/core';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';

import { environment } from '@env/environment';
import {CustomRouterStateSerializer} from '@store/router-store/router-store.reducer';
import { EchoesState, EchoesReducers } from './reducers';

export { EchoesState } from './reducers';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: Object.keys(EchoesReducers),
    rehydrate: true
  })(reducer);
}

// console.log all actions
export function logger(
  reducer: ActionReducer<EchoesState>
): ActionReducer<EchoesState> {
  return function(state: EchoesState, action: any): EchoesState {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

const metaReducers: MetaReducer<any, any>[] = !environment.production
  ? [logger, localStorageSyncReducer]
  : [localStorageSyncReducer];
const optionalImports = [];

if (!environment.production) {
  // Note that you must instrument after importing StoreModule
  optionalImports.push(StoreDevtoolsModule.instrument({ maxAge: 25 }));
}

@NgModule({
  imports: [
    StoreModule.forRoot(EchoesReducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    ...optionalImports
  ],
  declarations: [],
  exports: [],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ]
})
export class CoreStoreModule {}
