import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { SharedService } from '../../api.service';
import { Observable, of } from 'rxjs';
import { Action, ActionsSubject } from '@ngrx/store';
import {
  LoadRolesSuccess,
  RolesActionTypes,
  LoadRolesFail,
} from './roles.actions';
import { Roles } from '../../model';
import { tap, catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import {
  LoadCustomerFail,
  LoadCustomerSuccess,
} from 'src/app/customers/state/customer.actions';

@Injectable()
export class RolesEffects {
  loadRoles$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActionTypes.loadRoles),
      switchMap(() =>
        this.sharedService.getRoles().pipe(
          map((roles: Roles[]) => new LoadRolesSuccess(roles)),
          catchError((error) => of(new LoadRolesFail(error))) //mock error message
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private sharedService: SharedService
  ) {}
}
