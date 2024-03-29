import * as customerActions from './customer.actions';
import { Customer } from '../customer.model';
import * as fromRoot from '../../store/index';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface CustomerState extends EntityState<Customer> {
  selectedCustomerId: number;
  loading: boolean;
  loaded: boolean;
  error: string;
  searchInput: string;
  pageIndex: number;
  total: number;
}

export interface AppState extends fromRoot.AppState {
  customers: CustomerState;
}

export const customerAdapter: EntityAdapter<Customer> =
  createEntityAdapter<Customer>();

export const defaultCustomer: CustomerState = {
  ids: [],
  entities: {},
  selectedCustomerId: 0,
  loading: false,
  loaded: false,
  error: '',
  searchInput: '',
  pageIndex: 0,
  total: 0,
};

export const initialState = customerAdapter.getInitialState(defaultCustomer);

export function customerReducer(
  state = initialState,
  action: customerActions.Actions
): CustomerState {
  switch (action.type) {
    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS: {
      return {
        ...state,
        loading: true,
      };
    }

    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS: {
      return customerAdapter.setAll(action.payload.data, {
        ...state,
        loading: false,
        loaded: true,
        total: action.payload.total,
      });
    }

    case customerActions.CustomerActionTypes.LOAD_CUSTOMER_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case customerActions.CustomerActionTypes.LOAD_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(action.payload, {
        ...state,
        selectedCustomerId: action.payload.id,
      });
    }

    case customerActions.CustomerActionTypes.LOAD_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case customerActions.CustomerActionTypes.CREATE_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(action.payload, state);
    }

    case customerActions.CustomerActionTypes.CREATE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case customerActions.CustomerActionTypes.UPDATE_CUSTOMER_SUCCESS: {
      return customerAdapter.updateOne(action.payload, state);
    }

    case customerActions.CustomerActionTypes.UPDATE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case customerActions.CustomerActionTypes.DELETE_CUSTOMER_SUCCESS: {
      return customerAdapter.removeOne(action.payload, state);
    }

    case customerActions.CustomerActionTypes.DELETE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case customerActions.CustomerActionTypes.SEARCH_COSTUMER: {
      return {
        ...state,
        searchInput: action.payload,
      };
    }

    case customerActions.CustomerActionTypes.SET_PAGE_INDEX: {
      return {
        ...state,
        pageIndex: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

const getCustomerFeatureState =
  createFeatureSelector<CustomerState>('customers');

export const getCustomers = createSelector(
  getCustomerFeatureState,
  //(state: CustomerState) => state.customers
  customerAdapter.getSelectors().selectAll
);

export const getCustomersLoading = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.loading
);

export const getCustomersLoaded = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.loaded
);

export const getError = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.error
);

export const getCurrentCustomerId = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.selectedCustomerId
);

export const getSearchInput = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.searchInput
);

export const getCostumersTotal = createSelector(
  getCustomers,
  getCustomerFeatureState,
  (customers: Customer[], state: CustomerState) =>
    state.searchInput ? customers.length : state.total
);

export const getPageIndex = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.pageIndex
);

export const getCurrentCustomer = createSelector(
  getCustomerFeatureState,
  getCurrentCustomerId,
  (state) => state.entities[state.selectedCustomerId]
);
