import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { filter, finalize, first, Observable, tap } from "rxjs";
import { loadPersonal } from "./state/personal.action";
import * as fromRoot from '../../state/app-state'
import * as fromPersonalReducer from './state/personal.reducer'

@Injectable()
export class PersonalResolver implements Resolve<any>{
    loading: boolean = false;
    constructor(private store: Store<fromRoot.AppState>){
        console.log('resolve');
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store.pipe(
            select(fromPersonalReducer.personalIsLoaded),
            tap((loaded)=>{
                if(!this.loading && !loaded ){
                    this.loading = true;
                    this.store.dispatch(loadPersonal())
                }
            }),
            filter(loaded => loaded),
            first(),
            finalize(() => this.loading = false)
        )
    }
}