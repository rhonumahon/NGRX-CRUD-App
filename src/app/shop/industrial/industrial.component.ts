import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app-state';
import { IIndustrial } from './industrial.model';
import { IndustrialService } from './industrial.service';
import { selIndustrialEntities } from './state/industrial.selector';

@Component({
  selector: 'app-industrial',
  templateUrl: './industrial.component.html',
  styleUrls: ['./industrial.component.css']
})
export class IndustrialComponent implements OnInit {
  industrial$: Observable<IIndustrial[]>
  constructor(private store: Store<AppState>, private api: IndustrialService) { }

  ngOnInit(): void {
    this.industrial$ = this.store.pipe(select(selIndustrialEntities))
  }

}
