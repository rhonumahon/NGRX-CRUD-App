import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Update } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { catchError, map, mergeMap, Observable, of, switchMap } from "rxjs";
import { loadCarBrandsFail } from "../../state/shop.actions";
import { IIndustrial } from "../industrial.model";
import { IndustrialService } from "../industrial.service";
import { createIndustrial, createIndustrialFail, createIndustrialSuccess, loadIndustrial, loadIndustrialSuccessful, updateIndustrial, updateIndustrialFail, updateIndustrialSuccess } from "./industrial.actions";

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
        console.log(action);
        
        return this.industrialService.createIndustrial(action.industrial).pipe(
            map((data: any) => {
                const industrial = { ...action.industrial, id: data.id};
                return createIndustrialSuccess({industrial})
            }),
            catchError((err ) => of(createIndustrialFail(err)))
        )
      })
    )
  )

  updateIndustrial$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateIndustrial),
      switchMap((action) => {
        console.log(action);
        
        return this.industrialService.updateIndustrial(action.industrial).pipe(
          map((data) => {
            const updatedPost: Update<IIndustrial> = {
              id: Number(action.industrial.id),
              changes: {
                ...action.industrial,
              },
            };
            return updateIndustrialSuccess({ industrial: updatedPost });
          }),
          catchError((err ) => {
            return of(updateIndustrialFail(err))
          })
        );
      })
    );
  })


  constructor(private actions$: Actions, private industrialService: IndustrialService){}
}