// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { Action } from '@ngrx/store';
// import { Observable, of } from 'rxjs';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import { Shop } from '../shop.model';
// import { ShopService } from '../shop.service';
// import * as shopActions from './shop.actions';

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, combineLatestWith, map, mergeMap, Observable, of, tap } from "rxjs";
import { Category, Shop } from "../shop.model";
import { ShopService } from "../shop.service";
import * as shopActions from './shop.actions'

// @Injectable()
// export class ShopEffect {
//   constructor(
//     private actions$: Actions,
//     private shopService: ShopService
//   ) {}

//   loadShop$: Observable<Action> = createEffect(() =>
//     this.actions$.pipe(
//       ofType<shopActions.LoadShop>(
//         shopActions.ShopActionTypes.LOAD_SHOP
//       ),
//       mergeMap((action: shopActions.LoadShop) =>
//         this.shopService.getShop().pipe(

//           map(
//             (shop: Shop[]) => 
//               {
//                console.log(shop);
                  
//                 return new shopActions.LoadShopSuccess(shop)}
//           ),
//           catchError((err) => of(new shopActions.LoadShopFail(err)))
//         )
//       )
//     )
//   );

// }
//----------------------------------------------------
@Injectable()
export class ShopEffect {

  loadShop$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
      ofType(
        shopActions.ShopActionTypes.LOAD_SHOP
      ),
      mergeMap((action: shopActions.ShopActionTypes) => 
      this.shopService.getShop().pipe(
        combineLatestWith(this.shopService.getCategories()),
        map(([shop, cat]) =>  shopActions.loadShopSuccess([shop, cat])),
        catchError((err ) => of(shopActions.loadShopFail(err)))
      ))
    )

    
  )

  loadCarBrands$: Observable<Action> = createEffect(() => 
  this.actions$.pipe(
    ofType(
      shopActions.ShopActionTypes.LOAD_CARBRANDS
    ),
    mergeMap((action: shopActions.ShopActionTypes) => 
    this.shopService.getCarBrands().pipe(
      tap(car => console.log(car)
      ),
      map((car) =>  shopActions.loadCarBrandsSuccess(car)),
      catchError((err ) => of(shopActions.loadCarBrandsFail(err)))
    ))
  )

  
)


  constructor(
    private actions$: Actions,
    private shopService: ShopService
  ){}
}
