import { RouterReducerState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "./custome-serializer";


export const selectRouter = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const selectCurrentUrl = createSelector(
selectRouter,
router => router?.state?.url
)