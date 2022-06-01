import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store'
import * as fromRoot from '../../../state/app-state'
import { IPersonal } from '../personal.model'
import { loadPersonal, loadPersonalSuccess } from './personal.action'

export interface AppState extends fromRoot.AppState {
    personal: PersonalState
}

export interface PersonalState extends EntityState<IPersonal>{
    isLoaded: boolean
}

export const personalAdapter: EntityAdapter<IPersonal> =
  createEntityAdapter<IPersonal>();

  export const defaultPersonal: PersonalState = {
    ids: [],
    entities: {},
    isLoaded: false
  };
  
  export const initialState = personalAdapter.getInitialState(defaultPersonal);

  export const personalReducer = createReducer(
      initialState,
      on(loadPersonal, state => {
        return {
            ...state,
          };
      }),
      on(loadPersonalSuccess, (state, action) => {  
          return personalAdapter.setAll(action.personal, {
            ...state,
            isLoaded: true
          });
      })
  )

  export const selectPersonalState = createFeatureSelector<PersonalState>('personal');

export const personalIsLoaded = createSelector(
  selectPersonalState,
  state => state.isLoaded
)

export const personalEntities= createSelector(
    selectPersonalState,
    personalAdapter.getSelectors().selectAll
)

