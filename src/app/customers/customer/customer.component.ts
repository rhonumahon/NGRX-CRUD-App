import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadRoles } from 'src/app/shared/store/roles/roles.actions';
import { SearchCostumer } from '../state/customer.actions';
import * as fromCustomer from '../state/customer.reducer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: any;
  searchInput$: Observable<string>;
  constructor(private _store: Store<fromCustomer.AppState>) {}

  ngOnInit(): void {
    this._store.dispatch(new LoadRoles());
    this.searchInput$ = this._store.select(fromCustomer.getSearchInput);
  }

  searchCostumer(event: any): void {
    this._store.dispatch(new SearchCostumer(event.target.value));
  }
}
