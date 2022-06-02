import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { loadCarBrandsFail } from "../../state/shop.actions";
import { IndustrialService } from "../industrial.service";
import { IndustrialActionTypes, loadIndustrialSuccessful } from "./industrial.actions";
import { IIndustrial } from "./industrial.state";

@Injectable()
export class IndustrialEffect {
    loadIndustrial$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
      ofType(
        IndustrialActionTypes.LOAD_INDUSTRIAL
      ),
      mergeMap((action: IndustrialActionTypes) => 
      this.industrialService.getIndustrial().pipe(
        map((industrial: IIndustrial[]) => loadIndustrialSuccessful({industrial})),
        catchError((err ) => of(loadCarBrandsFail(err)))
      ))
    )
  )

  constructor(private actions$: Actions, private industrialService: IndustrialService){}
}