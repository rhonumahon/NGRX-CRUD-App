import { createAction, props } from "@ngrx/store";
import { IIndustrial } from "./industrial.state";

export enum IndustrialActionTypes {
    LOAD_INDUSTRIAL = '[INDUSTRIAL] Load Industrial',
    LOAD_INDUSTRIAL_SUCCESSFUL = '[INDUSTRIAL] Load Industrial Successful',
    LOAD_INDUSTRIAL_FAIL = '[INDUSTRIAL] Load Industrial Fail'
}

export const loadIndustrial = createAction(
    IndustrialActionTypes.LOAD_INDUSTRIAL,
)

export const loadIndustrialSuccessful = createAction(
    IndustrialActionTypes.LOAD_INDUSTRIAL_SUCCESSFUL,
    props<{ industrial: IIndustrial[]}>()
)

export const loadIndustrialFail = createAction(
    IndustrialActionTypes.LOAD_INDUSTRIAL_FAIL,
    error => error
)