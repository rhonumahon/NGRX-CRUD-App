import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app-state';
import { IIndustrial } from './industrial.model';
import { IndustrialService } from './industrial.service';
import { updateIndustrial } from './state/industrial.actions';
import { selIndustrialEntities } from './state/industrial.selector';

@Component({
  selector: 'app-industrial',
  templateUrl: './industrial.component.html',
  styleUrls: ['./industrial.component.css']
})
export class IndustrialComponent implements OnInit {
  industrial$: Observable<IIndustrial[]>
  industrialForm: FormGroup
  constructor(private store: Store<AppState>, private api: IndustrialService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.industrial$ = this.store.pipe(select(selIndustrialEntities))
    this.industrialForm = this.formBuilder.group({
      item: ['', Validators.required],
    })
  }

  updateIndustrial(id: any){
    const industrial: IIndustrial = {
      id: Number(id),
      item: this.industrialForm?.get('item')?.value
    };
    console.log(industrial);
    
    this.store.dispatch(updateIndustrial({industrial}))
  }
}
