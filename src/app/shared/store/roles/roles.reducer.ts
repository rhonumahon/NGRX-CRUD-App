import { ActionReducer } from '@ngrx/store';
import { Roles } from '../../model';
import { RolesActions, RolesActionTypes } from '../roles/roles.actions';

export interface RolesState {
  roles?: Roles[];
  loaded: boolean;
  loading: boolean;
  error?: string;
}

export const DEFAULT_ROLES_STATE: RolesState = {
  roles: [],
  loaded: false,
  loading: false,
  error: '',
};

export function reducer(
  state: RolesState = DEFAULT_ROLES_STATE,
  action: RolesActions
): RolesState {
  switch (action.type) {
    case RolesActionTypes.loadRoles: {
      return {
        ...state,
        loading: true,
      };
    }
    case RolesActionTypes.loadRolesSuccess: {
      return {
        ...state,
        loaded: true,
        loading: false,
        roles: action.payload,
      };
    }
    case RolesActionTypes.loadRolesFail: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
