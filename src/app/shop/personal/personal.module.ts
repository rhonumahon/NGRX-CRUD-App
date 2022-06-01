import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './personal.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPersonal from './state/personal.reducer'
import { PersonalEffect } from './state/personal.effects';
import { PersonalService } from './personal.service';


const routes: Routes = [
  {
    path: '',
    component: PersonalComponent
  }
]
@NgModule({
  declarations: [PersonalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('personal', fromPersonal.personalReducer),
    EffectsModule.forFeature([PersonalEffect]),
  ],
  providers: [
    PersonalService
  ]
})
export class PersonalModule { }
