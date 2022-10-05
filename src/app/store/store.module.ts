import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../../environments/environment';
import {
  StoreRouterConnectingModule,
  DefaultRouterStateSerializer,
} from '@ngrx/router-store';
import { CustomSerializer } from './router/custom-serializer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          name: 'NGRX Redux Store',
          logOnly: environment.production,
        })
      : [],
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
  ],
})
export class AppStoreModule {}
