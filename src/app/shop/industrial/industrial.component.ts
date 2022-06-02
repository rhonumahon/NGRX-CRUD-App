import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app-state';
import { selIndustrialEntities } from './state/industrial.selector';
import { IIndustrial } from './state/industrial.state';

@Component({
  selector: 'app-industrial',
  templateUrl: './industrial.component.html',
  styleUrls: ['./industrial.component.css']
})
export class IndustrialComponent implements OnInit {
  industrial$: Observable<IIndustrial[]>
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.industrial$ = this.store.select(selIndustrialEntities)
  }

}
