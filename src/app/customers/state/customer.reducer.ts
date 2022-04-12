import { Action } from '@ngrx/store';
import * as customerActions from './customer.actions';

const initialState = {
  customers: [
    {
      name: 'John Doe',
      phone: '910928392098',
      address: '123 Sun Street',
      membership: 'Platinum',
      id: 1,
    },
  ],
  loading: false,
  loaded: true,
};

export function customerReducer(
  state = initialState,
  action: customerActions.action
) {
  switch (action.type) {
    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    default: {
      return state;
    }
  }
}
