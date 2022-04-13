import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import * as customerActions from './customer.actions';

@Injectable()
export class CustomerEffect {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {}

  loadCustomers$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<customerActions.LoadCustomers>(
        customerActions.CustomerActionTypes.LOAD_CUSTOMERS
      ),
      mergeMap((action: customerActions.LoadCustomers) =>
        this.customerService.getCustomers().pipe(
          map(
            (customers: Customer[]) =>
              new customerActions.LoadCustomersSuccess(customers)
          ),
          catchError((err) => of(new customerActions.LoadCustomersFail(err)))
        )
      )
    )
  );
}
