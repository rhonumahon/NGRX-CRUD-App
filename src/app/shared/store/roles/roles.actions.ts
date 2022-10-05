import { Action } from '@ngrx/store';
import { Roles } from '../../model';

export enum RolesActionTypes {
  loadRoles = '[shared/roles] Load Roles',
  loadRolesSuccess = '[shared/roles] Load Roles Success',
  loadRolesFail = '[shared/roles] Load Roles Fail',
}

export class LoadRoles implements Action {
  readonly type = RolesActionTypes.loadRoles;
}

export class LoadRolesSuccess implements Action {
  readonly type = RolesActionTypes.loadRolesSuccess;

  constructor(public payload: Roles[]) {}
}

export class LoadRolesFail implements Action {
  readonly type = RolesActionTypes.loadRolesFail;

  constructor(public payload: any) {}
}

export type RolesActions = LoadRoles | LoadRolesSuccess | LoadRolesFail;
