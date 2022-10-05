import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from './router/custom-serializer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
};
