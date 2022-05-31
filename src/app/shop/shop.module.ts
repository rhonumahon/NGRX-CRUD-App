import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromShop from './state/shop.reducer';
import { ShopEffect } from './state/shop.effects';
import { CounterComponent } from './counter/counter.component';
import { CounterButtonsComponent } from './counter/counter-buttons/counter-buttons.component';
import { CounterOutputComponent } from './counter/counter-output/counter-output.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: 'personal',
        loadChildren: ()=> import('./personal/personal.module').then(m => m.PersonalModule)
      },
      {
        path: 'houseLot',
        loadChildren: ()=> import('./house-lot/house-lot.module').then(m => m.HouseLotModule)
      },
      {
        path: 'vehicles',
        loadChildren: ()=> import('./cars/cars.module').then(m => m.CarsModule)
      },
      {
        path: 'industrial',
        loadChildren: ()=> import('./industrial/industrial.module').then(m => m.IndustrialModule)
      }
    ]
  },
  
]

@NgModule({
  declarations: [ShopComponent, CounterComponent, CounterButtonsComponent, CounterOutputComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('shop', fromShop.shopReducer),
    EffectsModule.forFeature([ShopEffect]),
  ]
})
export class ShopModule { }
