import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndustrialComponent } from './industrial.component';

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
    RouterModule.forChild(routes)
  ]
})
export class IndustrialModule { }
