// import { Action } from '@ngrx/store';
// import { Shop } from '../shop.model';

import { createAction, props } from "@ngrx/store";
import { Category, Shop } from '../shop.model'
import { ICars, ShopState } from "./shop.reducer";

// export enum ShopActionTypes {
//   LOAD_SHOP = '[Shop] Load Shop',
//   LOAD_SHOP_SUCCESS = '[Shop] Load Shop Success',
//   LOAD_SHOP_FAIL = '[Shop] Load Shop Fail',
// }

// export class LoadShop implements Action {
//   readonly type = ShopActionTypes.LOAD_SHOP;
// }

// export class LoadShopSuccess implements Action {
//   readonly type = ShopActionTypes.LOAD_SHOP_SUCCESS;

//   constructor(public payload: Shop[]) {
//     console.log(payload);
//   }
// }

// export class LoadShopFail implements Action {
//   readonly type = ShopActionTypes.LOAD_SHOP_FAIL;

//   constructor(public payload: string) {}
// }

//----------------------------------------------------------------
export enum ShopActionTypes {
  LOAD_SHOP = '[SHOP] Load Shop',
  LOAD_SHOP_SUCCESS = '[SHOP] Load Shop Success',
  LOAD_SHOP_FAIL = '[SHOP] Load Shop Fail',

  LOAD_CARBRANDS = '[CARBRANDS] Load Car Brands',
  LOAD_CARBRANDS_SUCCESS = '[CARBRANDS] Load Car Brands Success',
  LOAD_CARBRANDS_FAIL = '[CARBRANDS] Load Car Brands Fail',

  INCREMENT = '[SHOP COUNTER] Increment',
  DECREMENT = '[SHOP COUNTER] Decrement',
  RESET = '[SHOP COUNTER] Reset',

}

export const increment = createAction(
  ShopActionTypes.INCREMENT
);

export const decrement = createAction(
  ShopActionTypes.DECREMENT
);
export const reset = createAction(
  ShopActionTypes.RESET
)

export const loadShop = createAction(
  ShopActionTypes.LOAD_SHOP
  );
export const loadShopSuccess = createAction(
  ShopActionTypes.LOAD_SHOP_SUCCESS,
  (shop) => shop
  
);
export const loadShopFail = createAction(
  ShopActionTypes.LOAD_SHOP_FAIL,
  (err) => err
  );

  export const loadCarBrands = createAction(
    ShopActionTypes.LOAD_CARBRANDS
    );
  export const loadCarBrandsSuccess = createAction(
    ShopActionTypes.LOAD_CARBRANDS_SUCCESS,
    props<{cars: ICars[]}>()
  );

  export const loadCarBrandsFail = createAction(
    ShopActionTypes.LOAD_CARBRANDS_FAIL,
    (err) => err
    );


