import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndustrialComponent } from './industrial.component';
import { StoreModule } from '@ngrx/store';
import { industrialReducer } from './state/industrial.reducer';
import { EffectsModule } from '@ngrx/effects';
import { IndustrialEffect } from './state/industrial.effects';
import { IndustrialService } from './industrial.service';
import { IndustrialAddComponent } from './industrial-add/industrial-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: IndustrialComponent
  }
]

@NgModule({
  declarations: [IndustrialComponent, IndustrialAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('industrial', industrialReducer),
    EffectsModule.forFeature([IndustrialEffect])
  ],
  providers: [IndustrialService],
})
export class IndustrialModule { }
