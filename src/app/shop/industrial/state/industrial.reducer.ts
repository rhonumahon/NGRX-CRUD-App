import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { IIndustrial } from "../industrial.model";
import { createIndustrialSuccess, loadIndustrial, loadIndustrialSuccessful, updateIndustrialFail, updateIndustrialSuccess } from "./industrial.actions";
import { defaultIndustrialState } from "./industrial.state";

export const industrialAdapter: EntityAdapter<IIndustrial> = createEntityAdapter<IIndustrial>()

export const initialState = industrialAdapter.getInitialState(defaultIndustrialState)
export const industrialReducer = createReducer(
initialState,
on(loadIndustrial, state => state),
on(loadIndustrialSuccessful, (state, action) => {
    return industrialAdapter.setAll(action.industrial, {...state, isLoaded: true} )
}),
on(createIndustrialSuccess, (state, action) => {
    return industrialAdapter.addOne(action.industrial, state);
}),
on(updateIndustrialSuccess, (state, action) => {
    return industrialAdapter.updateOne(action.industrial, state);
  }),
  on(updateIndustrialFail, (state, action) => {
    return {...state, error: action.industrial}
  }),
)