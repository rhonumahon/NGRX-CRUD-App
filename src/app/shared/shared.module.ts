import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { sharedReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { RolesEffects } from '../shared/store/roles/roles.effects';
import { SharedService } from '../shared/api.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('shared', sharedReducers),
    EffectsModule.forFeature([RolesEffects]),
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [SharedService],
    };
  }
}
