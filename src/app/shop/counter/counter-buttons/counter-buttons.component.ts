import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app-state';
import { decrement, increment, reset } from '../../state/shop.actions';
import { ShopState } from '../../state/shop.reducer';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css']
})
export class CounterButtonsComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  action(val: string){
   val == 'inc' ? this.store.dispatch(increment()) : val == 'dec' ? this.store.dispatch(decrement()) : this.store.dispatch(reset())
  }
  


}
