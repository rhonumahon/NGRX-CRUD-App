import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { filter, finalize, first, Observable, tap } from "rxjs";
import { loadCarBrands } from "../state/shop.actions";
import * as fromShopReducer from '../state/shop.reducer'

@Injectable()
export class CarsResolver implements Resolve<any>{
    loading: boolean = false;
    constructor(private store: Store<fromShopReducer.AppState>){
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store.pipe(
            select(fromShopReducer.isCarLoaded),
            tap((loaded)=>{
                if(!this.loading && !loaded){
                    this.loading = true;
                    this.store.dispatch(loadCarBrands())
                }
            }),
            filter(loaded => loaded),
            first(),
            finalize(() => this.loading = false)
        )
    }
}