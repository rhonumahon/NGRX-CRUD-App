import { createAction, props } from "@ngrx/store";
import { IPersonal } from "../personal.model";

export enum PersonalActionTypes {
    LOAD_PERSONAL = '[PERSONAL] Load Personal',
    LOAD_PERSONAL_SUCCESS = '[PERSONAL] Load Personal Success',
    LOAD_PERSONAL_FAIL = '[PERSONAL] Load Personal Fail',
  
  }

  export const loadPersonal = createAction(
    PersonalActionTypes.LOAD_PERSONAL
  );
  
  export const loadPersonalSuccess = createAction(
    PersonalActionTypes.LOAD_PERSONAL_SUCCESS,
    props<{personal: IPersonal[]}>()
  );

  export const loadPersonalFail = createAction(
    PersonalActionTypes.LOAD_PERSONAL_FAIL,
    err => err
  )