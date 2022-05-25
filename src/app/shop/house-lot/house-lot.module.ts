import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HouseLotComponent } from './house-lot.component';

const routes: Routes = [
  {
    path: '',
    component: HouseLotComponent
  }
]

@NgModule({
  declarations: [HouseLotComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HouseLotModule { }
