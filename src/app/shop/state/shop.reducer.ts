
import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Category, IVehicle, Shop } from "../shop.model";
import { decrement, increment, loadCarBrands, loadCarBrandsSuccess, loadShop, loadShopSuccess, reset } from "./shop.actions";
import * as fromRoot from './../../state/app-state'
export interface ShopState extends Shop {
shopLoaded: boolean
categories: Category[],
counter: number,
vehicles: IVehicle
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


