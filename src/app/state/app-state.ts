import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from "@ngrx/store";
import { environment } from "src/environments/environment";

export interface AppState {
 
}

//FOR LARGER APPLICATION example below
// export interface AppState {
//     app: AppState;
//     customers: CustomerState;
// }

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer
}

export const metaReducers: MetaReducer<AppState>[] = 
    !environment.production ? [] : [];



