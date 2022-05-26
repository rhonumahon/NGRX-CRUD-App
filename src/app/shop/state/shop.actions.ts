// import { Action } from '@ngrx/store';
// import { Shop } from '../shop.model';

import { createAction } from "@ngrx/store";
import { Shop } from '../shop.model'

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
  LOAD_SHOP_FAIL = '[SHOP] Load Shop Fail'

}

export const loadShop = createAction(
  ShopActionTypes.LOAD_SHOP
  );
export const loadShopSuccess = createAction(
  ShopActionTypes.LOAD_SHOP_SUCCESS,
  (shop: Shop) => shop
  
);
export const loadShopFail = createAction(
  ShopActionTypes.LOAD_SHOP_FAIL,
  (err) => err
  );


