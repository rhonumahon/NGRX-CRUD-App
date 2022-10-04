import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  combineLatestWith,
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap,
  startWith,
  throttleTime,
  withLatestFrom,
} from 'rxjs/operators';
import { Customer, CustomerResponse } from '../customer.model';
import { CustomerService } from '../customer.service';
import * as customerActions from './customer.actions';
import * as fromCustomer from '../state/customer.reducer';

@Injectable()
export class CustomerEffect {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private _store: Store<fromCustomer.AppState>
  ) {}

  loadCustomers$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<customerActions.LoadCustomers>(
        customerActions.CustomerActionTypes.LOAD_CUSTOMERS
      ),
      combineLatestWith(
        this._store
          .select(fromCustomer.getSearchInput)
          .pipe(debounceTime(600), distinctUntilChanged()),
        this._store.select(fromCustomer.getPageIndex)
      ),
      mergeMap(
        ([action, search, index]: [
          customerActions.LoadCustomers,
          string,
          number
        ]) =>
          this.customerService.getCustomers({ search, index: index + 1 }).pipe(
            map(
              (customers: CustomerResponse) =>
                new customerActions.LoadCustomersSuccess(customers)
            ),
            catchError((err) => of(new customerActions.LoadCustomersFail(err)))
          )
      )
    )
  );

  loadCustomer$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<customerActions.LoadCustomer>(
        customerActions.CustomerActionTypes.LOAD_CUSTOMER
      ),
      mergeMap((action: customerActions.LoadCustomer) =>
        this.customerService.getCustomerById(action.payload).pipe(
          map(
            (customer: Customer) =>
              new customerActions.LoadCustomerSuccess(customer)
          ),
          catchError((err) => of(new customerActions.LoadCustomersFail(err)))
        )
      )
    )
  );

  createCustomer$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<customerActions.CreateCustomer>(
        customerActions.CustomerActionTypes.CREATE_CUSTOMER
      ),
      map((action: customerActions.CreateCustomer) => action.payload),
      mergeMap((customer: Customer) =>
        this.customerService.createCustomer(customer).pipe(
          map(
            (newCustomer: Customer) =>
              new customerActions.CreateCustomerSuccess(newCustomer)
          ),
          catchError((err) => of(new customerActions.CreateCustomerFail(err)))
        )
      )
    )
  );

  updateCustomer$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<customerActions.UpdateCustomer>(
        customerActions.CustomerActionTypes.UPDATE_CUSTOMER
      ),
      map((action: customerActions.UpdateCustomer) => action.payload),
      mergeMap((customer: Customer) =>
        this.customerService.updateCustomer(customer).pipe(
          map(
            (updateCustomer: Customer) =>
              new customerActions.UpdateCustomerSuccess({
                id: updateCustomer.id,
                changes: updateCustomer,
              })
          ),
          catchError((err) => of(new customerActions.UpdateCustomerFail(err)))
        )
      )
    )
  );

  deleteCustomer$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<customerActions.DeleteCustomer>(
        customerActions.CustomerActionTypes.DELETE_CUSTOMER
      ),
      map((action: customerActions.DeleteCustomer) => action.payload),
      mergeMap((id: number) =>
        this.customerService.deleteCustomer(id).pipe(
          map(() => new customerActions.DeleteCustomerSuccess(id)),
          catchError((err) => of(new customerActions.DeleteCustomerFail(err)))
        )
      )
    )
  );
}
