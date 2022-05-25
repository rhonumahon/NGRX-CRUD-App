import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars.component';

const routes: Routes = [
  {
    path: '',
    component: CarsComponent
  }
]

@NgModule({
  declarations: [CarsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class CarsModule { }
