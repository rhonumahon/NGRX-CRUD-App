import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './personal.component';


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
    RouterModule.forChild(routes)
  ]
})
export class PersonalModule { }
