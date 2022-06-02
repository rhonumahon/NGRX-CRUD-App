import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app-state';
import { IIndustrial } from '../industrial.model';
import { IndustrialService } from '../industrial.service';
import { createIndustrial } from '../state/industrial.actions';

@Component({
  selector: 'app-industrial-add',
  templateUrl: './industrial-add.component.html',
  styleUrls: ['./industrial-add.component.css']
})
export class IndustrialAddComponent implements OnInit {
industrialForm: FormGroup
  constructor(public formBuilder: FormBuilder, private store: Store<AppState>, private api: IndustrialService) { }

  ngOnInit(): void {
    this.industrialForm = this.formBuilder.group({
      item: ['', Validators.required],
    })
  }

  createCustomer() {
    const industrial: IIndustrial = {
      item: this.industrialForm?.get('item')?.value
    };
    this.store.dispatch(createIndustrial({industrial}));
    this.industrialForm.reset();
  }

}
