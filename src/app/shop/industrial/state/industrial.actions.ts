import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { IIndustrial } from "../industrial.model";

export enum IndustrialActionTypes {
    LOAD_INDUSTRIAL = '[INDUSTRIAL] Load Industrial',
    LOAD_INDUSTRIAL_SUCCESSFUL = '[INDUSTRIAL] Load Industrial Successful',
    LOAD_INDUSTRIAL_FAIL = '[INDUSTRIAL] Load Industrial Fail',

    CREATE_INDUSTRIAL = '[INDUSTRIAL] Create Industrial',
    CREATE_INDUSTRIAL_SUCCESS = '[INDUSTRIAL] Create Industrial Successful',
    CREATE_INDUSTRIAL_FAIL = '[INDUSTRIAL] Create Industrial Fail',

    UPDATE_INDUSTRIAL = '[INDUSTRIAL] Update Industrial',
    UPDATE_INDUSTRIAL_SUCCESS = '[INDUSTRIAL] Update Industrial Successful',
    UPDATE_INDUSTRIAL_FAIL = '[INDUSTRIAL] Update Industrial Fail',

    DELETE_INDUSTRIAL = '[INDUSTRIAL] Delete Industrial',
    DELETE_INDUSTRIAL_SUCCESS = '[INDUSTRIAL] Delete Industrial Successful',
    DELETE_INDUSTRIAL_FAIL = '[INDUSTRIAL] Delete Industrial Fail'
}

export const loadIndustrial = createAction(
    IndustrialActionTypes.LOAD_INDUSTRIAL
)

export const loadIndustrialSuccessful = createAction(
    IndustrialActionTypes.LOAD_INDUSTRIAL_SUCCESSFUL,
    props<{ industrial: IIndustrial[]}>()
)

export const loadIndustrialFail = createAction(
    IndustrialActionTypes.LOAD_INDUSTRIAL_FAIL,
    error => error
)

export const createIndustrial = createAction(
    IndustrialActionTypes.CREATE_INDUSTRIAL,
    props<{ industrial: IIndustrial}>()
)

export const createIndustrialSuccess = createAction(
    IndustrialActionTypes.CREATE_INDUSTRIAL_SUCCESS,
    props<{ industrial: IIndustrial}>()
)

export const createIndustrialFail = createAction(
    IndustrialActionTypes.CREATE_INDUSTRIAL_FAIL,
    error => error
)

export const updateIndustrial = createAction(
    IndustrialActionTypes.UPDATE_INDUSTRIAL,
    props<{ industrial: IIndustrial }>()
  );
  
  export const updateIndustrialSuccess = createAction(
    IndustrialActionTypes.UPDATE_INDUSTRIAL_SUCCESS,
    props<{ industrial: Update<IIndustrial> }>()
  );

  export const updateIndustrialFail = createAction(
    IndustrialActionTypes.UPDATE_INDUSTRIAL_FAIL,
    error => error
  );

  export const deleteIndustrial = createAction(
    IndustrialActionTypes.DELETE_INDUSTRIAL,
    props<{ id: string }>()
  );
  
  export const deleteIndustrialSuccess = createAction(
    IndustrialActionTypes.DELETE_INDUSTRIAL_SUCCESS,
    props<{ id: string }>()
  );

  export const deleteIndustrialFail = createAction(
    IndustrialActionTypes.DELETE_INDUSTRIAL_FAIL,
    error => error
  );