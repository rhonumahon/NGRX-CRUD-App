import * as shopActions from './shop.actions';
import { Shop } from '../shop.model';
import * as fromRoot from '../../state/app-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ShopState extends EntityState<Shop> {
  selectedShopId: number;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  shop: ShopState;
}

export const shopAdapter: EntityAdapter<Shop> =
  createEntityAdapter<Shop>();

export const defaultShop: ShopState = {
  ids: [],
  entities: {},
  selectedShopId: 0,
  loading: false,
  loaded: false,
  error: '',
};

export const initialState = shopAdapter.getInitialState(defaultShop);

export function shopReducer(
  state = initialState,
  action: shopActions.Actions
): ShopState {
  switch (action.type) {
    case shopActions.ShopActionTypes.LOAD_SHOP: {
      return {
        ...state,
        loading: true,
      };
    }

    case shopActions.ShopActionTypes.LOAD_SHOP_SUCCESS: {
      return shopAdapter.setAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    }

    case shopActions.ShopActionTypes.LOAD_SHOP_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

const getShopFeatureState =
  createFeatureSelector<ShopState>('shop');

export const getShops = createSelector(
  getShopFeatureState,
  //(state: ShopState) => state.shop
  shopAdapter.getSelectors().selectAll
);

export const getShopsLoading = createSelector(
  getShopFeatureState,
  (state: ShopState) => state.loading
);

export const getShopsLoaded = createSelector(
  getShopFeatureState,
  (state: ShopState) => state.loaded
);

export const getError = createSelector(
  getShopFeatureState,
  (state: ShopState) => state.error
);

export const getCurrentShopId = createSelector(
  getShopFeatureState,
  (state: ShopState) => state.selectedShopId
);

export const getCurrentShop = createSelector(
  getShopFeatureState,
  getCurrentShopId,
  (state) => state.entities[state.selectedShopId]
);