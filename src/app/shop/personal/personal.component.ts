import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IPersonal } from './personal.model';
import * as fromPersonal from './state/personal.reducer'

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
 personal$: Observable<IPersonal[]>
  constructor(private store: Store<fromPersonal.AppState>) { }

  ngOnInit(): void {
    this.personal$ = this.store.select(fromPersonal.personalEntities)
  }

}
