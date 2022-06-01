import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICars } from '../state/shop.reducer';
import * as fromShop from '../state/shop.reducer'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
cars$: Observable<any>
  constructor(private store: Store<fromShop.AppState> ) { }

  ngOnInit(): void {
    this.cars$ = this.store.select(fromShop.selectCars)
    this.store.select(fromShop.selectCars).subscribe(i => console.log(i)
    )
  }

}
