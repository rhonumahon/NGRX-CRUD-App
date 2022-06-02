import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { filter, finalize, first, Observable, tap } from "rxjs";
import * as fromRoot from '../../state/app-state'
import { loadIndustrial } from "./state/industrial.actions";
import { selIndustrialLoaded } from "./state/industrial.selector";

@Injectable()
export class IndustrialResolver implements Resolve<any>{
    loading: boolean = false;
    constructor(private store: Store<fromRoot.AppState>){
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store.pipe(
            select(selIndustrialLoaded),
            tap((loaded)=>{
                if(!this.loading  && !loaded){
                    this.loading = true;
                    this.store.dispatch(loadIndustrial())
                }
            }),
            filter(loaded => loaded),
            first(),
            finalize(() => this.loading = false)
        )
    }
}