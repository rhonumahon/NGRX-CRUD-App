import { EntityState } from '@ngrx/entity';
import * as fromRoot from '../../../state/app-state'

export interface AppState extends fromRoot.AppState{
industrial: IIndustrial[];
}

export interface IndustrialState extends EntityState<IIndustrial> {
isLoaded: boolean;
}

export interface IIndustrial {
    id: number;
    item: string;
}

export const defaultIndustrialState: IndustrialState = {
ids: [],
entities: {},
isLoaded: false
}