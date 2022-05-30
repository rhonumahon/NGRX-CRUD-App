// import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Shop } from './shop.model';
// import * as shopActions from '../shop/state/shop.actions';
// import * as fromShop from './state/shop.reducer'
// import { Store } from '@ngrx/store';

// @Component({
//   selector: 'app-shop',
//   templateUrl: './shop.component.html',
//   styleUrls: ['./shop.component.css']
// })
// export class ShopComponent implements OnInit {
//   shop$: Observable<Shop[]>;
//   error$: Observable<String>;

//   constructor(private store: Store<fromShop.AppState>) {}

//   ngOnInit(): void {
//     this.store.dispatch(new shopActions.LoadShop());
//   }

// }
//-----------------------------------------------------

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable} from 'rxjs';
import { selectCurrentUrl } from '../state/router/router.selector';
import * as fromShop from './state/shop.reducer'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  shop$ = this.store.select(fromShop.selectShopState)
  currentUrl$: Observable<string>;
  constructor(private store: Store<fromShop.AppState>) {

  }

  ngOnInit(): void {
    this.currentUrl$ = this.store.select(selectCurrentUrl).pipe(
      map(url => url)
    )
  }
}