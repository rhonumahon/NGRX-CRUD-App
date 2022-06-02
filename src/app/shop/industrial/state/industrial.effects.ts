import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { loadCarBrandsFail } from "../../state/shop.actions";
import { IIndustrial } from "../industrial.model";
import { IndustrialService } from "../industrial.service";
import { createIndustrial, createIndustrialSuccess, loadIndustrial, loadIndustrialSuccessful } from "./industrial.actions";

@Injectable()
export class IndustrialEffect {
    loadIndustrial$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
      ofType(loadIndustrial),
      mergeMap((action) => 
      this.industrialService.getIndustrial().pipe(
        map((industrial: IIndustrial[]) => loadIndustrialSuccessful({industrial})),
        catchError((err ) => of(loadCarBrandsFail(err)))
      ))
    )
  )

  createIndustrial$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
      ofType(createIndustrial),
      mergeMap((action) => {
        return this.industrialService.createIndustrial(action.industrial).pipe(
            map((data: any) => {
                const industrial = { ...action.industrial, id: data.id};
                return createIndustrialSuccess({industrial})
            }
            )
        )
      })
    )
  )


  constructor(private actions$: Actions, private industrialService: IndustrialService){}
}