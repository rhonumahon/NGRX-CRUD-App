import { EntityState } from '@ngrx/entity';
import * as fromRoot from '../../../state/app-state'
import { IIndustrial } from '../industrial.model';

export interface AppState extends fromRoot.AppState{
industrial: IIndustrial[];
}

export interface IndustrialState extends EntityState<IIndustrial> {
isLoaded: boolean;
}

export const defaultIndustrialState: IndustrialState = {
ids: [],
entities: {},
isLoaded: false
}