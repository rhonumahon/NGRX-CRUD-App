import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./shop/shop.module').then((m) => m.ShopModule),
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then((m) => m.CustomersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
