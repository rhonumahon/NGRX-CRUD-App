import * as fromRoot from '../../store/index';
import * as fromRoles from './roles/roles.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface SharedState {
  role: fromRoles.RolesState;
}

export interface SharedCoreState extends fromRoot.AppState {
  shared: SharedState;
}

export const sharedReducers = {
  role: fromRoles.reducer,
};
