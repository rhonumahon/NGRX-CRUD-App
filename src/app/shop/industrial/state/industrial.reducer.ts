import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { loadIndustrial, loadIndustrialSuccessful } from "./industrial.actions";
import { defaultIndustrialState, IIndustrial } from "./industrial.state";

export const industrialAdapter: EntityAdapter<IIndustrial> = createEntityAdapter<IIndustrial>()

export const initialState = industrialAdapter.getInitialState(defaultIndustrialState)
export const industrialReducer = createReducer(
initialState,
on(loadIndustrial, state => state),
on(loadIndustrialSuccessful, (state, action) => {
    return industrialAdapter.setAll(action.industrial, {...state, isLoaded: true} )
})
)