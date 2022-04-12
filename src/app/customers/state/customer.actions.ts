import { Action } from '@ngrx/store';

export enum CustomerActionTypes {
  LOAD_CUSTOMERS = '[Customer] Load Customers',
}

export class LoadCustomers implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMERS;
}

export type action = LoadCustomers;
