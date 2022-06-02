import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndustrialComponent } from './industrial.component';
import { StoreModule } from '@ngrx/store';
import { industrialReducer } from './state/industrial.reducer';
import { EffectsModule } from '@ngrx/effects';
import { IndustrialEffect } from './state/industrial.effects';
import { IndustrialService } from './industrial.service';

const routes: Routes = [
  {
    path: '',
    component: IndustrialComponent
  }
]

@NgModule({
  declarations: [IndustrialComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('industrial', industrialReducer),
    EffectsModule.forFeature([IndustrialEffect])
  ],
  providers: [IndustrialService]
})
export class IndustrialModule { }
