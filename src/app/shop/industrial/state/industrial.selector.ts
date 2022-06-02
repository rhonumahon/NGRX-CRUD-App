import { createFeatureSelector, createSelector } from "@ngrx/store";
import { industrialAdapter } from "./industrial.reducer";
import { IndustrialState } from "./industrial.state";

export const selectIndustrial = createFeatureSelector<IndustrialState>('industrial');

export const selIndustrialLoaded = createSelector(
    selectIndustrial,
    state => state.isLoaded
)

export const selIndustrialEntities = createSelector(
    selectIndustrial,
    industrialAdapter.getSelectors().selectAll
)