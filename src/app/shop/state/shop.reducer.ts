// import * as shopActions from './shop.actions';
// import { Shop } from '../shop.model';
// import * as fromRoot from '../../state/app-state';
// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Category, Shop } from "../shop.model";
import { decrement, increment, loadCarBrands, loadCarBrandsSuccess, loadShop, loadShopSuccess, reset } from "./shop.actions";
import * as fromRoot from './../../state/app-state'
import { createEntityAdapter } from "@ngrx/entity";

// export interface ShopState extends EntityState<Shop> {
//   selectedShopId: number;
//   loading: boolean;
//   loaded: boolean;
//   error: string;
// }

// export interface AppState extends fromRoot.AppState {
//   shop: ShopState;
// }

// export const shopAdapter: EntityAdapter<Shop> =
//   createEntityAdapter<Shop>();

// export const defaultShop: ShopState = {
//   ids: [],
//   entities: {},
//   selectedShopId: 0,
//   loading: false,
//   loaded: false,
//   error: '',
// };

// export const initialState = shopAdapter.getInitialState(defaultShop);

// export function shopReducer(
//   state = initialState,
//   action: shopActions.Actions
// ): ShopState {
//   switch (action.type) {
//     case shopActions.ShopActionTypes.LOAD_SHOP: {
//       return {
//         ...state,
//         loading: true,
//       };
//     }

//     case shopActions.ShopActionTypes.LOAD_SHOP_SUCCESS: {
//       return shopAdapter.setAll(action.payload, {
//         ...state,
//         loading: false,
//         loaded: true,
//       });
//     }

//     case shopActions.ShopActionTypes.LOAD_SHOP_FAIL: {
//       return {
//         ...state,
//         entities: {},
//         loading: false,
//         loaded: false,
//         error: action.payload,
//       };
//     }

//     default: {
//       return state;
//     }
//   }
// }

// const getShopFeatureState =
//   createFeatureSelector<ShopState>('shop');

// export const getShops = createSelector(
//   getShopFeatureState,
//   //(state: ShopState) => state.shop
//   shopAdapter.getSelectors().selectAll
// );

// export const getShopsLoading = createSelector(
//   getShopFeatureState,
//   (state: ShopState) => state.loading
// );

// export const getShopsLoaded = createSelector(
//   getShopFeatureState,
//   (state: ShopState) => state.loaded
// );

// export const getError = createSelector(
//   getShopFeatureState,
//   (state: ShopState) => state.error
// );

// export const getCurrentShopId = createSelector(
//   getShopFeatureState,
//   (state: ShopState) => state.selectedShopId
// );

// export const getCurrentShop = createSelector(
//   getShopFeatureState,
//   getCurrentShopId,
//   (state) => state.entities[state.selectedShopId]
// );
//-------------------------------------------------------------
export interface ShopState extends Shop {
shopLoaded: boolean
categories: Category[],
counter: number,
vehicles: IVehicle
}

export interface IVehicle {
  cars: ICars[];
  isCarLoaded: boolean;
}

export interface ICars {
  id: number;
  category: string;
  link: string;
}
export interface AppState extends fromRoot.AppState {
shop: ShopState
}

const initialState: ShopState = {
  title: '',
  description: '',
  shopLoaded: false,
  categories: [],
  counter: 0,
  vehicles: {cars: [], isCarLoaded: false}
}



export const shopReducer = createReducer(
  initialState,
  on(loadShop, state => state),
  on(loadShopSuccess, (state, action) => {
    return {...action[0],  categories: action[1], shopLoaded: true, counter: 0, vehicles: {cars: [...state.vehicles.cars], isCarLoaded: false}}
  }),
  on(increment, (state) => {
    return {
        ...state, 
        counter: state.counter + 1,
    }
}),
on(decrement, (state) => {
    return {
        ...state,
        counter: state.counter - 1
    }
}),
on(reset, (state)=> {
    return {
        ...state,
        counter: 0
    }
}),
on(loadCarBrands, (state) => state),
on(loadCarBrandsSuccess, (state, action) => {
  return {
    ...state, vehicles: { cars: action.cars, isCarLoaded: true} 
  }
})
  

)

export const selectShopState = createFeatureSelector<ShopState>('shop');

export const shopLoaded = createSelector(
  selectShopState,
  state => state.shopLoaded
)

export const selectCounter = createSelector(
  selectShopState,
  state => state.counter
)

export const isCarLoaded = createSelector(
  selectShopState,
  state => state?.vehicles?.isCarLoaded
)

export const selectCars = createSelector(
  selectShopState,
  state => state?.vehicles?.cars
)


